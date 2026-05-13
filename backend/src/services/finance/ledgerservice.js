const Journal = require("../../models/finance/JournalEntry");

exports.createEntry = async (payment, tenantId) => {
  return Journal.create({
    tenantId,
    entries: [
      { account: "Accounts Payable", debit: payment.amount, credit: 0 },
      { account: "Cash/Bank", debit: 0, credit: payment.amount },
    ],
  });
};