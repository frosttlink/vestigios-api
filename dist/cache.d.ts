import type { CacheData, YouTubeChannel, YouTubeVideo } from "./schemas/youtube.js";
export declare function getCache(): Promise<CacheData | null>;
export declare function setCache(channel: YouTubeChannel | null, videos: YouTubeVideo[]): Promise<void>;
export declare function getCacheAgeInMinutes(): number;
//# sourceMappingURL=cache.d.ts.map