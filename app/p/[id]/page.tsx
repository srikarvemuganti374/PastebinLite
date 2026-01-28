import { notFound } from "next/navigation";
import { redis } from "@/lib/redis";

type PasteData = {
  content: string;
  expiresAt: number | null;
  remainingViews: number | null;
};

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await redis.get<PasteData>(`paste:${id}`);

  if (!data) {
    notFound();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Paste</h1>

      {/* ✅ Render ONLY the string */}
      <pre>{data.content}</pre>

      {/* Optional metadata display */}
      {data.remainingViews !== null && (
        <p>Remaining views: {data.remainingViews}</p>
      )}
    </main>
  );
}