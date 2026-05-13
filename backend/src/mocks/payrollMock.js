const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const p = { _id: generateId(), status: "PROCESSED", ...data }; db.push(p); return p; },
  find: async () => db,
};