const { randomUUID } = require('crypto')
const users = [
  {
    id: "1",
    email: "admin@test.com",
    passwordHash: "123456",   // temporarily plain for testing
    tenantId: "T1",
    role: "admin",
    isActive: true
  }
];   // temporary mock DB

const userRepository = {

  findByEmail: async (email) => {
    return users.find(u => u.email === email) || null;
  },

    create: async (data) => {      // corrected 
       const user = {
    id: randomUUID(),
    isActive: true,     // 🔥 ADD THIS
    ...data
  };

  users.push(user);
  return user;
},

   
  

  findById: async (id) => {
    return users.find(u => u.id === id);
  },

  findAllByTenant: async (tenantId) => {
    return users.filter(u => u.tenantId === tenantId);
  },

  update: async (id, data) => {
    const user = users.find(u => u.id === id);
    if (!user) return null;

     if (data.isActive !== undefined) {   //corrected
    user.isActive = data.isActive;
  }

    Object.assign(user, data);
    return user;
  },


  getRoles: async (userId) => {
  const user = users.find(u => u.id === userId);

  if (!user) return [];

  // simple mock role system
  return user.role ? [{ name: user.role }] : [{ name: "employee" }];
},


updateRefreshToken: async (userId, token) => {
  const user = users.find(u => u.id === userId);

  if (!user) return null;

  user.refreshToken = token;

  return user;
}, 


  deactivate: async (id) => {
    const user = users.find(u => u.id === id);
    if (user) user.isActive = false;
    return user;
  },

  assignRole: async (id, role) => {
    const user = users.find(u => u.id === id);
    if (user) user.role = role;
    return user;
  }
};

module.exports = userRepository 