import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/server/app";
import { ensureServerInitialized } from "@/server/bootstrap";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await ensureServerInitialized();
  if (req.url) {
    const hasApiPrefix = req.url === "/api" || req.url.startsWith("/api/");
    if (!hasApiPrefix) {
      req.url = `/api${req.url.startsWith("/") ? req.url : `/${req.url}`}`;
    }
  }
  return app(req as unknown as Parameters<typeof app>[0], res as unknown as Parameters<typeof app>[1]);
}
