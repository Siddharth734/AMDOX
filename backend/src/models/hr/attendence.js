const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  date: Date,
  checkIn: Date,
  checkOut: Date,
  hoursWorked: Number,
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);