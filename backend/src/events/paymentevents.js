const eventEmitter = require("./eventEmitter");
const notificationService = require("../services/common/notificationService");
const ledgerService = require("../services/finance/ledgerService");

eventEmitter.on("payment.completed", async (payment) => {
  // Trigger multiple independent actions

  await ledgerService.createEntry(payment, payment.tenantId);

  await notificationService.sendPaymentNotification(payment);
});