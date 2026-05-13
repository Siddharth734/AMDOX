const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  productId: String,
  quantity: Number,
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);