const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  employeeId: mongoose.Schema.Types.ObjectId,
  month: String,
  grossSalary: Number,
  deductions: Number,
  netSalary: Number,
  status: {
    type: String,
    enum: ["PENDING", "PROCESSED"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Payroll", payrollSchema);