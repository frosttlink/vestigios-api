import type { YouTubeVideo, YouTubeChannel } from "./youtube.js";
interface CacheData {
    channel: YouTubeChannel | null;
    videos: YouTubeVideo[];
    updatedAt: string;
}
export declare function getCache(): Promise<CacheData | null>;
export declare function setCache(channel: YouTubeChannel | null, videos: YouTubeVideo[]): Promise<void>;
export declare function getCacheAgeInMinutes(): number;
export {};
//# sourceMappingURL=cache.d.ts.map