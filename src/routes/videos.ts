import { Router, type Request, type Response } from "express";
import { getCache } from "../cache.js";

const router = Router();

/**
 * @openapi
 * /api/videos:
 *   get:
 *     summary: Lista todos os vídeos do canal
 *     description: Retorna a lista de vídeos cacheados do canal Vestígios RPG. Os dados são atualizados periodicamente via /api/refresh.
 *     tags:
 *       - Vídeos
 *     responses:
 *       200:
 *         description: Lista de vídeos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/YouTubeVideo'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data da última atualização do cache
 *       503:
 *         description: Cache vazio — nenhum dado disponível
 */
router.get("/videos", async (_req: Request, res: Response) => {
  const cache = await getCache();

  if (!cache || cache.videos.length === 0) {
    res.status(503).json({ error: "Cache vazio. Faça um POST /api/refresh primeiro." });
    return;
  }

  res.json({ videos: cache.videos, updatedAt: cache.updatedAt });
});

/**
 * @openapi
 * /api/videos/latest:
 *   get:
 *     summary: Retorna o vídeo mais recente
 *     description: Apenas o último vídeo publicado no canal.
 *     tags:
 *       - Vídeos
 *     responses:
 *       200:
 *         description: Vídeo mais recente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouTubeVideo'
 *       503:
 *         description: Cache vazio
 */
router.get("/videos/latest", async (_req: Request, res: Response) => {
  const cache = await getCache();

  if (!cache || cache.videos.length === 0) {
    res.status(503).json({ error: "Cache vazio. Faça um POST /api/refresh primeiro." });
    return;
  }

  res.json(cache.videos[0]);
});

export default router;
