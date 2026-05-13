const eventEmitter = require("./eventEmitter");
const notificationService = require("../services/common/notificationService");
const { generatePayslip } = require("../utils/pdfGenerator");

eventEmitter.on("payroll.processed", async (payroll) => {
  const pdf = await generatePayslip(payroll);

  await notificationService.sendPayslip(payroll.employeeId, pdf);
});