import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const optionalTrimmedString = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().optional());

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1),
  // Supports one or more origins separated by comma.
  // Example: https://webmitra-tech-web.vercel.app,https://webmitra-tech-web-git-main-*.vercel.app
  CLIENT_ORIGIN: z.string().min(1),
  COOKIE_DOMAIN: optionalTrimmedString,
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  REFRESH_COOKIE_NAME: z.string().default("wm_refresh"),
  CSRF_COOKIE_NAME: z.string().default("wm_csrf"),
  BCRYPT_ROUNDS: z.coerce.number().default(12),
  ADMIN_SEED_EMAIL: z.string().email(),
  ADMIN_SEED_PASSWORD: z.string().min(8),
  RESEND_API_KEY: z.string().min(1),
  MAIL_FROM: z.string().default("WebMitra.Tech <no-reply@webmitra.tech>"),
  MAIL_TO: z.string().email().default("webmitra3@gmail.com"),
  AUTO_REPLY_ENABLED: z
    .string()
    .optional()
    .default("true")
    .transform((value) => value.toLowerCase() === "true"),
  SEED_DUMMY_ON_STARTUP: z
    .string()
    .optional()
    .default("true")
    .transform((value) => value.toLowerCase() === "true"),
  CLOUDINARY_CLOUD_NAME: optionalTrimmedString.default(""),
  CLOUDINARY_API_KEY: optionalTrimmedString.default(""),
  CLOUDINARY_API_SECRET: optionalTrimmedString.default(""),
  WHATSAPP_NUMBER: z.string().default("9779869672736"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
  throw new Error(`Invalid environment variables:\n${errors}`);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
