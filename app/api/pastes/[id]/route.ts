import { NextResponse } from "next/server";
import { redis, Paste } from "@/lib/redis";
import { getNow } from "@/lib/time";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const key = `paste:${params.id}`;
  const paste = await redis.get<Paste>(key);

  if (!paste) {
    return NextResponse.json({ error: "Paste not found" }, { status: 404 });
  }

  if (paste.expiresAt && paste.expiresAt < getNow()) {
    await redis.del(key);
    return NextResponse.json({ error: "Paste expired" }, { status: 410 });
  }

  paste.remainingViews -= 1;

  if (paste.remainingViews <= 0) {
    await redis.del(key);
  } else {
    await redis.set(key, paste);
  }

  return NextResponse.json({
    content: paste.content,
    remainingViews: paste.remainingViews,
    expiresAt: paste.expiresAt,
  });
}
