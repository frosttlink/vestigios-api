import { z } from "zod";
export const ThumbnailSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
});
export const YouTubeVideoSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    channelTitle: z.string(),
    channelId: z.string(),
    thumbnails: z.object({
        default: ThumbnailSchema,
        medium: ThumbnailSchema,
        high: ThumbnailSchema,
    }),
});
export const YouTubeChannelSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    customUrl: z.string(),
    thumbnails: z.object({
        default: ThumbnailSchema,
        medium: ThumbnailSchema,
        high: ThumbnailSchema,
    }),
    subscriberCount: z.number(),
    videoCount: z.number(),
    viewCount: z.number(),
});
export const CacheDataSchema = z.object({
    channel: YouTubeChannelSchema.nullable(),
    videos: z.array(YouTubeVideoSchema),
    updatedAt: z.string(),
});
//# sourceMappingURL=youtube.js.map