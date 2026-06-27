import dotenv from "dotenv";
dotenv.config();
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { getCache, getCacheAgeInMinutes, setCache } from "./cache.js";
import channelRouter from "./routes/channel.js";
import videosRouter from "./routes/videos.js";
import { getChannelByHandle, getLatestVideos } from "./youtube.js";

const PORT = Number(process.env.PORT) || 3333;
const CHANNEL_HANDLE = process.env.CHANNEL_HANDLE || "@vestigiosrpg";

const app = Fastify({ logger: true });

await app.register(cors);
await app.register(sensible);
await app.register(swagger, {
  openapi: {
    info: {
      title: "Vestígios RPG — YouTube API",
      version: "1.0.0",
      description:
        "API que inspeciona o canal do YouTube do Vestígios RPG e retorna os vídeos cacheados. Documentação interativa para testar os endpoints.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Desenvolvimento",
      },
    ],
  },
});
await app.register(swaggerUi, { routePrefix: "/api-docs" });

await app.register(videosRouter, { prefix: "/api" });
await app.register(channelRouter, { prefix: "/api" });

app.get("/api/status", async () => {
  const cache = await getCache();
  return {
    channelHandle: CHANNEL_HANDLE,
    cacheAgeMinutes: getCacheAgeInMinutes(),
    hasCache: cache !== null,
    videoCount: cache?.videos.length ?? 0,
    updatedAt: cache?.updatedAt ?? null,
  };
});

app.post("/api/refresh", async (req, reply) => {
  try {
    const channel = await getChannelByHandle(CHANNEL_HANDLE);

    if (!channel) {
      return reply.notFound("Canal não encontrado no YouTube.");
    }

    const videos = await getLatestVideos(channel.id);
    await setCache(channel, videos);

    return {
      message: "Cache atualizado com sucesso.",
      videoCount: videos.length,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    req.log.error(err, "Refresh error");
    return reply.internalServerError(
      err instanceof Error ? err.message : "Erro desconhecido",
    );
  }
});

async function autoRefresh() {
  try {
    const channel = await getChannelByHandle(CHANNEL_HANDLE);
    if (!channel) {
      console.warn("Canal não encontrado no YouTube — cache vazio após startup");
      return;
    }
    const videos = await getLatestVideos(channel.id);
    await setCache(channel, videos);
    console.log(`Cache inicializado com ${videos.length} vídeos`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Falha ao inicializar cache no startup:", message);
  }
}

await app.listen({ port: PORT, host: "0.0.0.0" });
console.log(`Vestígios API rodando em http://localhost:${PORT}`);
console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
autoRefresh();
