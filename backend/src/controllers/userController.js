import { userService } from "../services/userService.js";

export const userController = {
  create: async (req, res, next) => {
    try {
      const user = await userService.create(req.body.tenantId || req.user?.tenantId, req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await userService.getById(req.user.tenantId, req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll(req.user.tenantId);
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const user = await userService.update(req.user.tenantId, req.params.id, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  deactivate: async (req, res, next) => {
    try {
      const user = await userService.deactivate(req.user.tenantId, req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  assignRole: async (req, res, next) => {
    try {
      const { role } = req.body;
      const result = await userService.assignRole(req.params.id, req.user.tenantId, role);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
};