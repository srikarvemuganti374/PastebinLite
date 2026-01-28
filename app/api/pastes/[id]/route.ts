// app/api/pastes/[id]/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(
  req: Request,
  { params }: { params: { id: string } } // ✅ not a Promise
) {
  const { id } = params;

  const paste = await redis.get(`paste:${id}`);

  if (!paste) {
    return NextResponse.json({ error: "Paste not found" }, { status: 404 });
  }

  return NextResponse.json({
    content: paste.content,
    remaining_views: paste.remainingViews,
    expires_at: paste.expiresAt,
  });
}
