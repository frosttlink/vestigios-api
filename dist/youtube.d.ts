export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
        default: {
            url: string;
            width: number;
            height: number;
        };
        medium: {
            url: string;
            width: number;
            height: number;
        };
        high: {
            url: string;
            width: number;
            height: number;
        };
    };
    channelTitle: string;
    channelId: string;
}
export interface YouTubeChannel {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    thumbnails: {
        default: {
            url: string;
            width: number;
            height: number;
        };
        medium: {
            url: string;
            width: number;
            height: number;
        };
        high: {
            url: string;
            width: number;
            height: number;
        };
    };
    subscriberCount: number;
    videoCount: number;
    viewCount: number;
}
export declare function getChannelByHandle(handle: string): Promise<YouTubeChannel | null>;
export declare function getLatestVideos(channelId: string, maxResults?: number): Promise<YouTubeVideo[]>;
//# sourceMappingURL=youtube.d.ts.map