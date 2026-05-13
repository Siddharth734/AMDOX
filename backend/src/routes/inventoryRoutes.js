import express from "express";
import { createInventory, getInventory } from "../controllers/inventoryController.js";
const router = express.Router();
router.post("/", createInventory);
router.get("/", getInventory);
export default router;