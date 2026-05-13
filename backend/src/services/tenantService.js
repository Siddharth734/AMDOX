import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/encryption.js";
import { NotFoundError, ConflictError } from "../utils/errors.js";

export const tenantService = {
  create: async (data) => {
    if (!data.adminPassword) {
      throw new Error("adminPassword is required");
    }

    const existing = await Tenant.findOne({ name: data.name });
    if (existing) throw new ConflictError("Tenant with this name already exists.");

    const tenant = await Tenant.create({
      name: data.name,
      plan: data.plan || "basic",
      basicCurrency: data.basicCurrency || "USD",
      fiscalYearStart: data.fiscalYearStart || 1,
    });

    // Create super admin for this tenant
    const passwordHash = hashPassword(data.adminPassword);
    const adminUser = await User.create({
      tenantId: tenant._id.toString(),
      email: data.adminEmail,
      username: data.adminEmail.split("@")[0],
      password: passwordHash,
      name: data.adminName || "",
      role: "superadmin",
      verified: true,
    });

    return {
      tenant,
      adminUser: { id: adminUser._id, email: adminUser.email },
    };
  },

  getById: async (tenantId) => {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) throw new NotFoundError("Tenant not found");
    return tenant;
  },

  update: async (tenantId, data) => {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) throw new NotFoundError("Tenant not found");
    Object.assign(tenant, data);
    await tenant.save();
    return tenant;
  },

  deactivate: async (tenantId) => {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) throw new NotFoundError("Tenant not found");
    tenant.isActive = false;
    await tenant.save();
    return tenant;
  },

  getAll: async () => {
    return Tenant.find();
  },
};