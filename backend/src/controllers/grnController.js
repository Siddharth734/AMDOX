import GRN from "../mocks/grnMock.js";
import Inventory from "../mocks/inventorymock.js";

export const createGRN = async (req, res, next) => {
  try {
    if (!req.body.items) {
      return res.status(400).json({ success: false, message: "Items are required" });
    }
    const grn = await GRN.create(req.body);
    for (const item of req.body.items) {
      await Inventory.create({ tenantId: req.body.tenantId, productId: item.productId, quantity: item.receivedQty });
    }
    res.status(201).json({ success: true, data: grn });
  } catch (err) { next(err); }
};

export const getGRN = async (req, res, next) => {
  try { const data = await GRN.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};