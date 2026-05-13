const Attendance = require("../../models/hr/Attendance");

exports.markAttendance = async (data, tenantId) => {
  return Attendance.create({ ...data, tenantId });
};