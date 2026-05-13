import dotenv from "dotenv";
dotenv.config();

// ── Required env guards ──────────────────────────────────
const required = [
  "MONGO_URI",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
  "GOOGLE_ACCESS_TOKEN",
  "GOOGLE_USER",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`${key} not initialised in environment variables`);
  }
}

// ── Exported config object ───────────────────────────────
const config = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN,
  GOOGLE_USER: process.env.GOOGLE_USER,
};

export default config;
