const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  employeeId: mongoose.Schema.Types.ObjectId,
  type: String,
  from: Date,
  to: Date,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);