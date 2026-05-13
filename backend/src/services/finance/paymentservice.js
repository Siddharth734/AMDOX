const ledgerService = require("./ledgerService");

exports.processPayment = async (data, tenantId) => {
  const payment = await paymentRepo.create({
    ...data,
    tenantId,
    status: "COMPLETED",
  });

  // Ledger entry
  await ledgerService.createEntry(payment, tenantId);

  // Notification
  await notificationService.sendPaymentNotification(payment);

  return payment;
};