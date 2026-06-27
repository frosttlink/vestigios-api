import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getCache } from "../cache.js";
import { YouTubeChannelSchema } from "../schemas/youtube.js";

const ResponseChannelSchema = z.object({
  channel: YouTubeChannelSchema,
  updatedAt: z.string(),
});

const ErrorSchema = z.object({
  error: z.string(),
});

const channelPlugin: FastifyPluginAsync = async (app) => {
  app.get(
    "/channel",
    {
      schema: {
        response: {
          200: zodToJsonSchema(ResponseChannelSchema, { target: "openApi3" }),
          503: zodToJsonSchema(ErrorSchema, { target: "openApi3" }),
        },
      },
    },
    async (_req, reply) => {
      const cache = await getCache();

      if (!cache?.channel) {
        return reply.serviceUnavailable(
          "Cache vazio. Faça um POST /api/refresh primeiro.",
        );
      }

      return { channel: cache.channel, updatedAt: cache.updatedAt };
    },
  );
};

export default channelPlugin;
