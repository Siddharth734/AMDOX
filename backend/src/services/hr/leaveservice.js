const Leave = require("../../models/hr/Leave");

exports.applyLeave = async (data, tenantId) => {
  return Leave.create({ ...data, tenantId });
};

exports.approveLeave = async (leaveId, tenantId) => {
  return Leave.findOneAndUpdate(
    { _id: leaveId, tenantId },
    { status: "APPROVED" },
    { new: true }
  );
};