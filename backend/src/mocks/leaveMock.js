const generateId = () => Date.now().toString();
const db = [];
export default {
  create: async (data) => { const leave = { _id: generateId(), status: "PENDING", ...data }; db.push(leave); return leave; },
  find: async () => db,
};