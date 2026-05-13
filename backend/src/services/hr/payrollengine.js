const Attendance = require("../../models/hr/Attendance");
const Leave = require("../../models/hr/Leave");

class PayrollEngine {
  async calculate(employee, month, tenantId) {
    const attendances = await Attendance.find({
      employeeId: employee._id,
      tenantId,
    });

    const leaves = await Leave.find({
      employeeId: employee._id,
      tenantId,
      status: "APPROVED",
    });

    const workingDays = attendances.length;
    const leaveDays = leaves.length;

    const grossSalary = employee.baseSalary;

    // Simple deduction logic
    const deduction = (leaveDays / 30) * grossSalary;

    const netSalary = grossSalary - deduction;

    return {
      grossSalary,
      deduction,
      netSalary,
    };
  }
}

module.exports = new PayrollEngine();