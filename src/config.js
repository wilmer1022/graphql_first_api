import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://mongo_db/apicompany";
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "ana090399d1608";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost.com";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
