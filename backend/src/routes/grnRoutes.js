import express from "express";
import { createGRN, getGRN } from "../controllers/grnController.js";
const router = express.Router();
router.post("/", createGRN);
router.get("/", getGRN);
export default router;