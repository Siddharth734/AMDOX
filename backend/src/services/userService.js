import User from "../models/User.js";
import { hashPassword } from "../utils/encryption.js";
import { NotFoundError, ConflictError } from "../utils/errors.js";

export const userService = {
  create: async (tenantId, data) => {
    const existing = await User.findOne({ email: data.email });
    if (existing && existing.tenantId === tenantId) {
      throw new ConflictError("User already exists.");
    }

    const passwordHash = hashPassword(data.password);
    const user = await User.create({
      username: data.username || data.email.split("@")[0],
      email: data.email,
      password: passwordHash,
      name: data.name || "",
      role: data.role || "employee",
      tenantId,
      verified: true, // admin-created users are pre-verified
    });

    return {
      id: user._id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    };
  },

  getById: async (tenantId, userId) => {
    const user = await User.findById(userId).select("-password -refreshToken -resetToken");
    if (!user || user.tenantId !== tenantId) throw new NotFoundError("User not found.");
    return user;
  },

  getAll: async (tenantId) => {
    return User.find({ tenantId }).select("-password -refreshToken -resetToken");
  },

  update: async (tenantId, userId, data) => {
    const user = await User.findById(userId);
    if (!user || user.tenantId !== tenantId) throw new NotFoundError("User not found");
    Object.assign(user, data);
    await user.save();
    return user;
  },

  deactivate: async (tenantId, userId) => {
    const user = await User.findById(userId);
    if (!user || user.tenantId !== tenantId) throw new NotFoundError("User not found.");
    user.isActive = false;
    await user.save();
    return user;
  },

  assignRole: async (userId, tenantId, role) => {
    const user = await User.findById(userId);
    if (!user || user.tenantId !== tenantId) throw new NotFoundError("User not found.");
    user.role = role;
    await user.save();
    return { message: `Role ${role} assigned successfully.` };
  },
};