const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const grn = { _id: generateId(), status: "RECEIVED", ...data }; db.push(grn); return grn; },
  find: async () => db,
};