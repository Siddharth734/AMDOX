const Payroll = require("../../models/hr/Payroll");
const payrollEngine = require("./payrollEngine");
const Employee = require("../../models/hr/Employee");
const eventEmitter = require("../../events/eventEmitter");

exports.runPayroll = async (month, tenantId) => {
  const employees = await Employee.find({ tenantId });

  const results = [];

  for (let emp of employees) {
    const calc = await payrollEngine.calculate(emp, month, tenantId);

    const payroll = await Payroll.create({
      tenantId,
      employeeId: emp._id,
      month,
      grossSalary: calc.grossSalary,
      deductions: calc.deduction,
      netSalary: calc.netSalary,
      status: "PROCESSED",
    });

    // Emit event
    eventEmitter.emit("payroll.processed", payroll);

    results.push(payroll);
  }

  return results;
};