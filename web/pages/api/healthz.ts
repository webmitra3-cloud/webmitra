import type { NextApiRequest, NextApiResponse } from "next";
import { ensureServerInitialized } from "@/server/bootstrap";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  await ensureServerInitialized();
  res.status(200).json({ ok: true });
}
