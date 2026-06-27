import type { YouTubeChannel, YouTubeVideo } from "./schemas/youtube.js";

interface SearchListResponse {
  items: {
    id: { videoId: string };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      channelTitle: string;
      thumbnails: YouTubeVideo["thumbnails"];
    };
  }[];
}

interface VideoListResponse {
  items: {
    id: string;
    snippet: YouTubeVideo;
  }[];
}

interface ChannelListResponse {
  items: {
    id: string;
    snippet: {
      title: string;
      description: string;
      customUrl: string;
      thumbnails: YouTubeChannel["thumbnails"];
    };
    statistics: {
      subscriberCount: string;
      videoCount: string;
      viewCount: string;
    };
  }[];
}

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error("YOUTUBE_API_KEY não configurada");
  }
  return key;
}

function buildUrl(path: string, params: Record<string, string>): string {
  const searchParams = new URLSearchParams({
    key: getApiKey(),
    ...params,
  });
  return `${YOUTUBE_API_BASE}${path}?${searchParams.toString()}`;
}

export async function getChannelByHandle(handle: string): Promise<YouTubeChannel | null> {
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

  const data = (await res.json()) as ChannelListResponse;

  if (!data.items?.length) return null;

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

export async function getLatestVideos(
  channelId: string,
  maxResults = 10,
): Promise<YouTubeVideo[]> {
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

  const searchData = (await searchRes.json()) as SearchListResponse;

  if (!searchData.items?.length) return [];

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

  const videosData = (await videosRes.json()) as VideoListResponse;

  return (
    videosData.items?.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
    })) ?? []
  );
}
