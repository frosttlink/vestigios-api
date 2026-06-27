import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import { getCache, setCache, getCacheAgeInMinutes } from "./cache.js";
import { getChannelByHandle, getLatestVideos } from "./youtube.js";
import videosRouter from "./routes/videos.js";
import channelRouter from "./routes/channel.js";
const app = express();
const PORT = Number(process.env.PORT) || 3333;
const CHANNEL_HANDLE = process.env.CHANNEL_HANDLE || "@vestigiosrpg";
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", videosRouter);
app.use("/api", channelRouter);
app.get("/api/status", async (_req, res) => {
    const cache = await getCache();
    res.json({
        channelHandle: CHANNEL_HANDLE,
        cacheAgeMinutes: getCacheAgeInMinutes(),
        hasCache: cache !== null,
        videoCount: cache?.videos.length ?? 0,
        updatedAt: cache?.updatedAt ?? null,
    });
});
app.post("/api/refresh", async (_req, res) => {
    try {
        const channel = await getChannelByHandle(CHANNEL_HANDLE);
        if (!channel) {
            res.status(404).json({ error: "Canal não encontrado no YouTube." });
            return;
        }
        const videos = await getLatestVideos(channel.id);
        await setCache(channel, videos);
        res.json({
            message: "Cache atualizado com sucesso.",
            videoCount: videos.length,
            updatedAt: new Date().toISOString(),
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        console.error("Refresh error:", message);
        res.status(500).json({ error: message });
    }
});
/**
 * @openapi
 * components:
 *   schemas:
 *     YouTubeVideo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do vídeo no YouTube
 *         title:
 *           type: string
 *           description: Título do vídeo
 *         description:
 *           type: string
 *           description: Descrição do vídeo
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: Data de publicação
 *         channelTitle:
 *           type: string
 *           description: Nome do canal
 *         channelId:
 *           type: string
 *           description: ID do canal
 *         thumbnails:
 *           type: object
 *           properties:
 *             default:
 *               $ref: '#/components/schemas/Thumbnail'
 *             medium:
 *               $ref: '#/components/schemas/Thumbnail'
 *             high:
 *               $ref: '#/components/schemas/Thumbnail'
 *     YouTubeChannel:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         customUrl:
 *           type: string
 *         subscriberCount:
 *           type: integer
 *         videoCount:
 *           type: integer
 *         viewCount:
 *           type: integer
 *     Thumbnail:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         width:
 *           type: integer
 *         height:
 *           type: integer
 */
async function autoRefresh() {
    try {
        const channel = await getChannelByHandle(CHANNEL_HANDLE);
        if (!channel) {
            console.warn("⚠️ Canal não encontrado no YouTube — cache vazio após startup");
            return;
        }
        const videos = await getLatestVideos(channel.id);
        await setCache(channel, videos);
        console.log(`✅ Cache inicializado com ${videos.length} vídeos`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        console.error("❌ Falha ao inicializar cache no startup:", message);
    }
}
app.listen(PORT, () => {
    console.log(`🎯 Vestígios API rodando em http://localhost:${PORT}`);
    console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
    autoRefresh();
});
//# sourceMappingURL=index.js.map