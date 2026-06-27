import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getCache } from "../cache.js";
import { YouTubeVideoSchema } from "../schemas/youtube.js";

const ResponseVideosSchema = z.object({
  videos: z.array(YouTubeVideoSchema),
  updatedAt: z.string(),
});

const ErrorSchema = z.object({
  error: z.string(),
});

const videosPlugin: FastifyPluginAsync = async (app) => {
  app.get(
    "/videos",
    {
      schema: {
        response: {
          200: zodToJsonSchema(ResponseVideosSchema, { target: "openApi3" }),
          503: zodToJsonSchema(ErrorSchema, { target: "openApi3" }),
        },
      },
    },
    async (_req, reply) => {
      const cache = await getCache();

      if (!cache || cache.videos.length === 0) {
        return reply.serviceUnavailable(
          "Cache vazio. Faça um POST /api/refresh primeiro.",
        );
      }

      return { videos: cache.videos, updatedAt: cache.updatedAt };
    },
  );

  app.get(
    "/videos/latest",
    {
      schema: {
        response: {
          200: zodToJsonSchema(YouTubeVideoSchema, { target: "openApi3" }),
          503: zodToJsonSchema(ErrorSchema, { target: "openApi3" }),
        },
      },
    },
    async (_req, reply) => {
      const cache = await getCache();

      if (!cache || cache.videos.length === 0) {
        return reply.serviceUnavailable(
          "Cache vazio. Faça um POST /api/refresh primeiro.",
        );
      }

      return cache.videos[0];
    },
  );
};

export default videosPlugin;
