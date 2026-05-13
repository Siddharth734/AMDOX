import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    plan: { type: String, default: "basic" },
    basicCurrency: { type: String, default: "USD" },
    fiscalYearStart: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("tenants", tenantSchema);

export default Tenant;
