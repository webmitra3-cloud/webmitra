import fs from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { uploadsDir } from "@/server/config/uploads";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".avif") return "image/avif";
  return "application/octet-stream";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const fileParam = req.query.file;
  const fileParts = Array.isArray(fileParam) ? fileParam : fileParam ? [fileParam] : [];
  if (!fileParts.length) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  const requestedPath = path.normalize(path.join(uploadsDir, ...fileParts));
  const normalizedRoot = path.normalize(uploadsDir + path.sep);
  if (!requestedPath.startsWith(normalizedRoot)) {
    res.status(400).json({ message: "Invalid file path" });
    return;
  }

  try {
    const file = await fs.readFile(requestedPath);
    res.setHeader("Content-Type", getContentType(requestedPath));
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.status(200).send(file);
  } catch {
    res.status(404).json({ message: "File not found" });
  }
}
