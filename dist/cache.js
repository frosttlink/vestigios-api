import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CacheDataSchema } from "./schemas/youtube.js";
const CACHE_DIR = path.resolve("cache");
const CACHE_FILE = path.join(CACHE_DIR, "videos.json");
let inMemory = null;
async function ensureCacheDir() {
    if (!existsSync(CACHE_DIR)) {
        await mkdir(CACHE_DIR, { recursive: true });
    }
}
async function readCacheFromDisk() {
    try {
        const raw = await readFile(CACHE_FILE, "utf-8");
        return CacheDataSchema.parse(JSON.parse(raw));
    }
    catch {
        return null;
    }
}
async function writeCacheToDisk(data) {
    await ensureCacheDir();
    await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
}
export async function getCache() {
    if (inMemory)
        return inMemory;
    inMemory = await readCacheFromDisk();
    return inMemory;
}
export async function setCache(channel, videos) {
    const data = {
        channel,
        videos,
        updatedAt: new Date().toISOString(),
    };
    inMemory = data;
    await writeCacheToDisk(data);
}
export function getCacheAgeInMinutes() {
    if (!inMemory?.updatedAt)
        return Number.POSITIVE_INFINITY;
    const elapsed = Date.now() - new Date(inMemory.updatedAt).getTime();
    return Math.floor(elapsed / 60_000);
}
//# sourceMappingURL=cache.js.map