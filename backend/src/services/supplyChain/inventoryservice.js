const Inventory = require("../../models/supplyChain/Inventory");

exports.updateStock = async (items, tenantId) => {
  for (let item of items) {
    await Inventory.findOneAndUpdate(
      { productId: item.productId, tenantId },
      { $inc: { quantity: item.receivedQty } },
      { upsert: true }
    );
  }
};