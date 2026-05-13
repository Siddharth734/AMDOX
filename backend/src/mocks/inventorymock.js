const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const item = { _id: generateId(), ...data }; db.push(item); return item; },
  find: async () => db,
};