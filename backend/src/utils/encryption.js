import crypto from "crypto";

export const hashPassword = (plain) =>
  crypto.createHash("sha256").update(plain).digest("hex");

export const comparePassword = (plain, hash) =>
  crypto.createHash("sha256").update(plain).digest("hex") === hash;