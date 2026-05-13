import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config/config.js";
import connectDB from "./config/database.js";

// ── Route imports ────────────────────────────────────────
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import grnRoutes from "./routes/grnRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

// Side-effect imports (event listeners)
import "./services/common/notificationservice.js";
import "./services/common/auditservice.js";

const app = express();

// ── Global middleware ────────────────────────────────────
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ── Health check ─────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ success: true, status: "Server is running", timestamp: new Date().toISOString() });
});

// ── API routes ───────────────────────────────────────────
app.use("/api/auth",      authRoutes);
app.use("/api/users",     userRoutes);
app.use("/api/tenants",   tenantRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves",    leaveRoutes);
app.use("/api/payroll",   payrollRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/grn",       grnRoutes);
app.use("/api/journal",   journalRoutes);

// ── Global error handler ────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ── Start server ─────────────────────────────────────────
const start = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      console.log(`🚀 Amdox ERP backend running on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
