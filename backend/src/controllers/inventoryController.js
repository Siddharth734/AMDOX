import Inventory from "../mocks/inventorymock.js";

export const createInventory = async (req, res, next) => {
  try { const item = await Inventory.create(req.body); res.status(201).json({ success: true, data: item }); }
  catch (err) { next(err); }
};

export const getInventory = async (req, res, next) => {
  try { const data = await Inventory.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};