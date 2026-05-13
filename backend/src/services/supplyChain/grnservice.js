const grnRepo = require("../../repositories/supplyChain/grnRepository");
const inventoryService = require("./inventoryService");

exports.createGRN = async (data, tenantId) => {
  const grn = await grnRepo.create({ ...data, tenantId });

  // Update inventory
  await inventoryService.updateStock(grn.items, tenantId);

  return grn;
};