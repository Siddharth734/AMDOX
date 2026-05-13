import User from "../models/User.js";
import Session from "../models/Session.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import { signAccessToken, signRefreshToken, verifyAccessToken } from "../utils/jwt.js";
import { sendEmail } from "../services/emailService.js";
import { generateOTP, getOTPHTML } from "../utils/otpUtils.js";
import { UnauthorisedError, ConflictError, NotFoundError } from "../utils/errors.js";
import { registerSchema, loginSchema } from "../utils/validationSchemas.js";

const SALT_ROUNDS = 10;

// ── Register ─────────────────────────────────────────────
export async function register(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { username, email, password } = value;

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ success: false, message: "Username or email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ username, email, password: hashedPass });

    // Generate & send OTP
    const otp = generateOTP();
    const html = getOTPHTML(otp);
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await Otp.create({ email, user: user._id, otpHash });
    await sendEmail(email, "Amdox ERP — Email Verification", `Your OTP code is ${otp}`, html);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Check your email for verification OTP.",
      data: {
        user: { username: user.username, email: user.email, verified: user.verified },
      },
    });
  } catch (err) {
    next(err);
  }
}

// ── Verify Email (OTP) ──────────────────────────────────
export async function verifyEmail(req, res, next) {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).json({ success: false, message: "OTP and email are required" });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpRecord = await Otp.findOne({ email, otpHash });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findByIdAndUpdate(
      otpRecord.user,
      { verified: true },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Cleanup all OTPs for this user
    await Otp.deleteMany({ user: otpRecord.user });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        user: { username: user.username, email: user.email, verified: user.verified },
      },
    });
  } catch (err) {
    next(err);
  }
}

// ── Resend OTP ───────────────────────────────────────────
export async function resendOtp(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.verified) {
      return res.status(400).json({ success: false, message: "Email already verified" });
    }

    // Remove old OTPs
    await Otp.deleteMany({ user: user._id });

    const otp = generateOTP();
    const html = getOTPHTML(otp);
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await Otp.create({ email, user: user._id, otpHash });
    await sendEmail(email, "Amdox ERP — Email Verification", `Your OTP code is ${otp}`, html);

    res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (err) {
    next(err);
  }
}

// ── Login ────────────────────────────────────────────────
export async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(401).json({ success: false, message: "Email not verified. Please verify your email first." });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: "Account deactivated" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create refresh token & session
    const refreshToken = signRefreshToken({ id: user._id.toString() });
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await Session.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
    });

    // Create access token
    const accessToken = signAccessToken({
      userId: user._id.toString(),
      sessionId: session._id.toString(),
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        accessToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name || user.username,
          role: user.role,
          tenantId: user.tenantId,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

// ── Get Me ───────────────────────────────────────────────
export async function getMe(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId).select("-password -refreshToken -resetToken");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name || user.username,
          role: user.role,
          tenantId: user.tenantId,
          verified: user.verified,
        },
      },
    });
  } catch (err) {
    next(new UnauthorisedError("Invalid or expired token"));
  }
}

// ── Refresh Token ────────────────────────────────────────
export async function refreshToken(req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "No refresh token found" });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const refreshTokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const session = await Session.findOne({ refreshTokenHash, revoked: false });

    if (!session) {
      return res.status(400).json({ success: false, message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Issue new tokens (rotation)
    const newAccessToken = signAccessToken({
      userId: user._id.toString(),
      sessionId: session._id.toString(),
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    const newRefreshToken = signRefreshToken({ id: user._id.toString() });
    session.refreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed",
      data: { accessToken: newAccessToken },
    });
  } catch (err) {
    next(err);
  }
}

// ── Logout ───────────────────────────────────────────────
export async function logout(req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({ success: false, message: "No refresh token found" });
    }

    const refreshTokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const session = await Session.findOne({ refreshTokenHash, revoked: false });

    if (session) {
      session.revoked = true;
      await session.save();
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}

// ── Logout All ───────────────────────────────────────────
export async function logoutAll(req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({ success: false, message: "No refresh token found" });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    await Session.updateMany({ user: decoded.id, revoked: false }, { revoked: true });

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out from all devices" });
  } catch (err) {
    next(err);
  }
}

// ── Forgot Password (placeholder) ───────────────────────
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    // Placeholder — forgot password not yet implemented
    res.status(200).json({
      success: true,
      message: "If this email exists, a reset link has been sent.",
    });
  } catch (err) {
    next(err);
  }
}

// ── Reset Password (placeholder) ────────────────────────
export async function resetPassword(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      message: "Password reset functionality coming soon.",
    });
  } catch (err) {
    next(err);
  }
}