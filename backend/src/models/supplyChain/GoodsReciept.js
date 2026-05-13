const mongoose = require("mongoose");

const grnSchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  poId: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder" },
  items: [
    {
      productId: String,
      receivedQty: Number,
    },
  ],
  status: {
    type: String,
    enum: ["RECEIVED", "PARTIAL"],
  },
}, { timestamps: true });

module.exports = mongoose.model("GoodsReceipt", grnSchema);