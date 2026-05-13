const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const emp = { _id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() }; db.push(emp); return emp; },
  find: async (query = {}) => db.filter(e => !query.tenantId || e.tenantId === query.tenantId),
  findById: async (id) => db.find(e => e._id === id),
};