import { Router, type Request, type Response } from "express";
import { getCache } from "../cache.js";

const router = Router();

/**
 * @openapi
 * /api/channel:
 *   get:
 *     summary: Dados do canal do YouTube
 *     description: Informações do canal Vestígios RPG (inscritos, total de vídeos, etc).
 *     tags:
 *       - Canal
 *     responses:
 *       200:
 *         description: Dados do canal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouTubeChannel'
 *       503:
 *         description: Cache vazio
 */
router.get("/channel", async (_req: Request, res: Response) => {
  const cache = await getCache();

  if (!cache?.channel) {
    res.status(503).json({ error: "Cache vazio. Faça um POST /api/refresh primeiro." });
    return;
  }

  res.json({ channel: cache.channel, updatedAt: cache.updatedAt });
});

export default router;
