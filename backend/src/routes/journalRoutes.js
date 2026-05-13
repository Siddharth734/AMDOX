import express from "express";
import { createJournal, getJournals } from "../controllers/journalController.js";
const router = express.Router();
router.post("/", createJournal);
router.get("/", getJournals);
export default router;