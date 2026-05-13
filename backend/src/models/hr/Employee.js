const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  department: String,
  role: String,
  baseSalary: Number,
  joiningDate: Date,
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);