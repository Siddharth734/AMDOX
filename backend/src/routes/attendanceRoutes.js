import express from "express";
import { createAttendance, getAttendance } from "../controllers/attendanceController.js";
const router = express.Router();
router.post("/", createAttendance);
router.get("/", getAttendance);
export default router;