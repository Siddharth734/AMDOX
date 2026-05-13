import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { authLimiter, loginLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Apply a general rate limiter to all auth routes
router.use(authLimiter);

// Public routes
router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-otp",  authController.resendOtp);

// Token routes (use cookies)
router.get("/me", authController.getMe);
router.get("/refresh-token", authController.refreshToken);
router.get("/logout", authController.logout);
router.get("/logout-all", authController.logoutAll);

// Password (placeholder)
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password",  authController.resetPassword);

export default router;