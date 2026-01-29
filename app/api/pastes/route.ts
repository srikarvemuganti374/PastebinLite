import { NextResponse } from "next/server";
import { redis, Paste } from "@/lib/redis";
import { nanoid } from "nanoid";
import { getNow } from "@/lib/time";

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const id = nanoid(8);

  const paste: Paste = {
    content,
    remainingViews: 10,
    expiresAt: getNow() + 60 * 60 * 1000, // 1 hour
  };

  await redis.set(`paste:${id}`, paste);

  return NextResponse.json({
    id,
    url: `/p/${id}`,
  });
}
