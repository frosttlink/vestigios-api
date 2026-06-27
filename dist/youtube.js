const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
function getApiKey() {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) {
        throw new Error("YOUTUBE_API_KEY não configurada");
    }
    return key;
}
function buildUrl(path, params) {
    const searchParams = new URLSearchParams({
        key: getApiKey(),
        ...params,
    });
    return `${YOUTUBE_API_BASE}${path}?${searchParams.toString()}`;
}
export async function getChannelByHandle(handle) {
    const url = buildUrl("/channels", {
        part: "snippet,statistics",
        forHandle: handle,
    });
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        console.error(`YouTube API error (channels): ${res.status} — ${text}`);
        return null;
    }
    const data = (await res.json());
    if (!data.items?.length)
        return null;
    const item = data.items[0];
    return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        customUrl: item.snippet.customUrl,
        thumbnails: item.snippet.thumbnails,
        subscriberCount: Number.parseInt(item.statistics.subscriberCount, 10),
        videoCount: Number.parseInt(item.statistics.videoCount, 10),
        viewCount: Number.parseInt(item.statistics.viewCount, 10),
    };
}
export async function getLatestVideos(channelId, maxResults = 10) {
    const searchUrl = buildUrl("/search", {
        part: "snippet",
        channelId,
        order: "date",
        maxResults: String(maxResults),
        type: "video",
    });
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) {
        const text = await searchRes.text();
        console.error(`YouTube API error (search): ${searchRes.status} — ${text}`);
        return [];
    }
    const searchData = (await searchRes.json());
    if (!searchData.items?.length)
        return [];
    const videoIds = searchData.items.map((item) => item.id.videoId).filter(Boolean);
    const videosUrl = buildUrl("/videos", {
        part: "snippet",
        id: videoIds.join(","),
    });
    const videosRes = await fetch(videosUrl);
    if (!videosRes.ok) {
        const text = await videosRes.text();
        console.error(`YouTube API error (videos): ${videosRes.status} — ${text}`);
        return [];
    }
    const videosData = (await videosRes.json());
    return (videosData.items?.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
    })) ?? []);
}
//# sourceMappingURL=youtube.js.map