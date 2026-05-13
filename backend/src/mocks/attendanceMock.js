const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const r = { _id: generateId(), ...data }; db.push(r); return r; },
  find: async () => db,
};