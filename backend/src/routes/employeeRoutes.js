import express from "express";
import { createEmployee, getEmployees } from "../controllers/employeecontroller.js";
const router = express.Router();
router.post("/", createEmployee);
router.get("/", getEmployees);
export default router;