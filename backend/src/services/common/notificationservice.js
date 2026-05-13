import emailQueue from "../../jobs/emailJob.js";
import payrollEmitter from "../../events/payrollemitter.js";
import { generatePayslip } from "../../utils/pdfgeneration.js";

console.log("Notification listener loaded");

export const sendPaymentNotification = async (payment) => {
  await emailQueue.add("paymentSuccess", { amount: payment.amount });
};

payrollEmitter.on("payrollProcessed", async (payroll) => {
  console.log("📩 Payroll event received");
  const pdf = await generatePayslip(payroll);
  console.log("📄 PDF GENERATED:", pdf);
  await sendPaymentNotification({ amount: payroll.netSalary });
});