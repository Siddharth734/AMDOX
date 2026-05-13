import express from "express";
import { tenantController } from "../controllers/tenantController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",                  tenantController.create);
router.get("/",  authMiddleware,  tenantController.getAll);
router.get("/:id", authMiddleware, tenantController.getById);
router.put("/:id", authMiddleware, tenantController.update);
router.patch("/:id/deactivate", authMiddleware, tenantController.deactivate);

export default router;