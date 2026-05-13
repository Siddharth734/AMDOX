import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import logger from "./utils/logger.js";
import { v4 as uuidv4 } from "uuid";


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
app.use(morgan(config.NODE_ENV === "development" ? "dev" : "combined", { stream: { write: (message) => logger.info(message.trim()) } }));

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
  const errorId = uuidv4();
  logger.error({
    id: errorId,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.expose ? err.message : `Internal Server Error - Error ID: ${errorId}`,
  });
});

// ── Start server ─────────────────────────────────────────
const start = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      logger.info(`🚀 Amdox ERP backend running on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
