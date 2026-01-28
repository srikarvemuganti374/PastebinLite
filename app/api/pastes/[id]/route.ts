import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getNow } from "@/lib/time";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const key = `paste:${params.id}`;
  const data = await redis.get<any>(key);

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = getNow();

  if (data.expiresAt && now >= data.expiresAt) {
    await redis.del(key);
    return NextResponse.json({ error: "Expired" }, { status: 404 });
  }

  if (data.remainingViews !== null) {
    if (data.remainingViews <= 0) {
      await redis.del(key);
      return NextResponse.json({ error: "No views left" }, { status: 404 });
    }
    data.remainingViews -= 1;
    await redis.set(key, data);
  }

  return NextResponse.json({
    content: data.content,
    remaining_views: data.remainingViews,
    expires_at: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
  });
}
