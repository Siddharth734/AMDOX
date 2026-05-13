const grnRepo = require("../../repositories/supplyChain/grnRepository");

exports.createInvoice = async (data, tenantId) => {
  const po = await poRepo.findById(data.poId, tenantId);
  const grn = await grnRepo.findByPO(data.poId, tenantId);

  if (!po || !grn) throw new Error("Missing PO or GRN");

  // 3-Way Matching
  const poAmount = calculatePO(po);
  const grnQty = calculateGRN(grn);

  if (data.amount > poAmount) {
    throw new Error("Invoice exceeds PO");
  }

  // Add more validations here

  return invoiceRepo.create({ ...data, tenantId });
};