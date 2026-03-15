import os from "os";
import path from "path";
import { env } from "./env";

// In production (Render), /tmp is reliably writable even on ephemeral filesystems.
const defaultProdUploadsDir = path.join(os.tmpdir(), "webmitra", "uploads");
// In local Next.js development we store uploads in the app's static directory.
const defaultDevUploadsDir = path.resolve(process.cwd(), "public", "uploads");

export const uploadsDir = env.NODE_ENV === "production" ? defaultProdUploadsDir : defaultDevUploadsDir;
