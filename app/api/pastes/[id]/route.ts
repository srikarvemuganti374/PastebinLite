import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type Paste = {
  content: string;
  expiresAt: number | null;
  remainingViews: number | null;
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const paste = await redis.get<Paste>(`paste:${id}`);

  if (!paste) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    content: paste.content,
    remainingViews: paste.remainingViews,
    expiresAt: paste.expiresAt,
  });
}
