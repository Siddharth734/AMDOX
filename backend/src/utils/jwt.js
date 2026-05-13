import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const signAccessToken = (payload) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (payload) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token) =>
  jwt.verify(token, config.JWT_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, config.JWT_SECRET);
