const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    poNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    vendorName: {
      type: String,
      required: true,
      trim: true
    },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        totalItemPrice: { type: Number, required: true }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "SHIPPED", "RECEIVED", "CANCELLED"],
      default: "PENDING"
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// Compound index for efficient multi-tenant lookups
purchaseOrderSchema.index({ tenantId: 1, poNumber: 1 });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
