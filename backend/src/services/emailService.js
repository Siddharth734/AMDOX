import nodemailer from "nodemailer";
import config from "../config/config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error) => {
  if (error) {
    console.log("⚠️  Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Amdox ERP" <${config.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("📧 Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email send error:", error.message);
  }
};
