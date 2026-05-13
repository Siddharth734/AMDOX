import { tenantService } from "../services/tenantService.js";

export const tenantController = {
  create: async (req, res, next) => {
    try {
      const result = await tenantService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const result = await tenantService.getById(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const result = await tenantService.getAll();
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const result = await tenantService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  deactivate: async (req, res, next) => {
    try {
      const result = await tenantService.deactivate(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
};