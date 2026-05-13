import express from "express";
import { createPayroll, getPayroll } from "../controllers/payrollController.js";
const router = express.Router();
router.post("/", createPayroll);
router.get("/", getPayroll);
export default router;