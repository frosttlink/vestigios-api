import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { YouTubeVideo, YouTubeChannel } from "./youtube.js";

const CACHE_DIR = path.resolve("cache");
const CACHE_FILE = path.join(CACHE_DIR, "videos.json");

interface CacheData {
  channel: YouTubeChannel | null;
  videos: YouTubeVideo[];
  updatedAt: string;
}

let inMemory: CacheData | null = null;

async function ensureCacheDir(): Promise<void> {
  if (!existsSync(CACHE_DIR)) {
    await mkdir(CACHE_DIR, { recursive: true });
  }
}

async function readCacheFromDisk(): Promise<CacheData | null> {
  try {
    const raw = await readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw) as CacheData;
  } catch {
    return null;
  }
}

async function writeCacheToDisk(data: CacheData): Promise<void> {
  await ensureCacheDir();
  await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function getCache(): Promise<CacheData | null> {
  if (inMemory) return inMemory;
  inMemory = await readCacheFromDisk();
  return inMemory;
}

export async function setCache(
  channel: YouTubeChannel | null,
  videos: YouTubeVideo[],
): Promise<void> {
  const data: CacheData = {
    channel,
    videos,
    updatedAt: new Date().toISOString(),
  };
  inMemory = data;
  await writeCacheToDisk(data);
}

export function getCacheAgeInMinutes(): number {
  if (!inMemory?.updatedAt) return Infinity;
  const elapsed = Date.now() - new Date(inMemory.updatedAt).getTime();
  return Math.floor(elapsed / 60_000);
}
