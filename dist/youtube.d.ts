import type { YouTubeChannel, YouTubeVideo } from "./schemas/youtube.js";
export declare function getChannelByHandle(handle: string): Promise<YouTubeChannel | null>;
export declare function getLatestVideos(channelId: string, maxResults?: number): Promise<YouTubeVideo[]>;
//# sourceMappingURL=youtube.d.ts.map