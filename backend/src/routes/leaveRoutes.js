import express from "express";
import { createLeave, getLeaves } from "../controllers/leaveController.js";
const router = express.Router();
router.post("/", createLeave);
router.get("/", getLeaves);
export default router;