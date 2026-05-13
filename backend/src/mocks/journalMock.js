const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const e = { _id: generateId(), ...data }; db.push(e); return e; },
  find: async () => db,
};