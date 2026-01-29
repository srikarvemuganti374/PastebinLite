import { Redis } from "@upstash/redis";

export type Paste = {
  content: string;
  expiresAt: number | null;
  remainingViews: number;
};

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
