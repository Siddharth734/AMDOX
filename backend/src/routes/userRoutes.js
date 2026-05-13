import express from "express";
import { userController } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",              authMiddleware, userController.create);
router.get("/",               authMiddleware, userController.getAll);
router.get("/:id",            authMiddleware, userController.getById);
router.put("/:id",            authMiddleware, userController.update);
router.patch("/:id/deactivate", authMiddleware, userController.deactivate);
router.patch("/:id/role",     authMiddleware, userController.assignRole);

export default router;