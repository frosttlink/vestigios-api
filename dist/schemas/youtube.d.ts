import { z } from "zod";
export declare const ThumbnailSchema: z.ZodObject<{
    url: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    url: string;
    width: number;
    height: number;
}, {
    url: string;
    width: number;
    height: number;
}>;
export declare const YouTubeVideoSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    publishedAt: z.ZodString;
    channelTitle: z.ZodString;
    channelId: z.ZodString;
    thumbnails: z.ZodObject<{
        default: z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>;
        medium: z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>;
        high: z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    channelId: string;
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
}, {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    channelId: string;
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
}>;
export declare const YouTubeChannelSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    customUrl: z.ZodString;
    thumbnails: z.ZodObject<{
        default: z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>;
        medium: z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>;
        high: z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    subscriberCount: z.ZodNumber;
    videoCount: z.ZodNumber;
    viewCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    description: string;
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
    customUrl: string;
    subscriberCount: number;
    videoCount: number;
    viewCount: number;
}, {
    id: string;
    title: string;
    description: string;
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
    customUrl: string;
    subscriberCount: number;
    videoCount: number;
    viewCount: number;
}>;
export declare const CacheDataSchema: z.ZodObject<{
    channel: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        customUrl: z.ZodString;
        thumbnails: z.ZodObject<{
            default: z.ZodObject<{
                url: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                url: string;
                width: number;
                height: number;
            }, {
                url: string;
                width: number;
                height: number;
            }>;
            medium: z.ZodObject<{
                url: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                url: string;
                width: number;
                height: number;
            }, {
                url: string;
                width: number;
                height: number;
            }>;
            high: z.ZodObject<{
                url: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                url: string;
                width: number;
                height: number;
            }, {
                url: string;
                width: number;
                height: number;
            }>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>;
        subscriberCount: z.ZodNumber;
        videoCount: z.ZodNumber;
        viewCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        description: string;
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
        customUrl: string;
        subscriberCount: number;
        videoCount: number;
        viewCount: number;
    }, {
        id: string;
        title: string;
        description: string;
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
        customUrl: string;
        subscriberCount: number;
        videoCount: number;
        viewCount: number;
    }>>;
    videos: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        publishedAt: z.ZodString;
        channelTitle: z.ZodString;
        channelId: z.ZodString;
        thumbnails: z.ZodObject<{
            default: z.ZodObject<{
                url: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                url: string;
                width: number;
                height: number;
            }, {
                url: string;
                width: number;
                height: number;
            }>;
            medium: z.ZodObject<{
                url: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                url: string;
                width: number;
                height: number;
            }, {
                url: string;
                width: number;
                height: number;
            }>;
            high: z.ZodObject<{
                url: z.ZodString;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                url: string;
                width: number;
                height: number;
            }, {
                url: string;
                width: number;
                height: number;
            }>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        description: string;
        publishedAt: string;
        channelTitle: string;
        channelId: string;
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
    }, {
        id: string;
        title: string;
        description: string;
        publishedAt: string;
        channelTitle: string;
        channelId: string;
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
    }>, "many">;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    channel: {
        id: string;
        title: string;
        description: string;
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
        customUrl: string;
        subscriberCount: number;
        videoCount: number;
        viewCount: number;
    } | null;
    videos: {
        id: string;
        title: string;
        description: string;
        publishedAt: string;
        channelTitle: string;
        channelId: string;
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
    }[];
    updatedAt: string;
}, {
    channel: {
        id: string;
        title: string;
        description: string;
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
        customUrl: string;
        subscriberCount: number;
        videoCount: number;
        viewCount: number;
    } | null;
    videos: {
        id: string;
        title: string;
        description: string;
        publishedAt: string;
        channelTitle: string;
        channelId: string;
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
    }[];
    updatedAt: string;
}>;
export type YouTubeVideo = z.infer<typeof YouTubeVideoSchema>;
export type YouTubeChannel = z.infer<typeof YouTubeChannelSchema>;
export type CacheData = z.infer<typeof CacheDataSchema>;
//# sourceMappingURL=youtube.d.ts.map