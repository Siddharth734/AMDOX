import payrollEmitter from "../../events/payrollemitter.js";

export const log = async (action, data) => {
  console.log("AUDIT:", action, data);
};

payrollEmitter.on("payrollProcessed", async (payroll) => {
  console.log("AUDIT:", payroll.employeeId);
});