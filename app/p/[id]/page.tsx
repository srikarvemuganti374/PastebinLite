import { notFound } from "next/navigation";
import { redis } from "@/lib/redis";

type Paste = {
  content: string;
  expiresAt: number | null;
  remainingViews: number | null;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PastePage({ params }: Props) {
  const { id } = await params;

  const paste = await redis.get<Paste>(`paste:${id}`);

  if (!paste) {
    notFound();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Paste</h1>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          background: "#090808",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {paste.content}
      </pre>

      {paste.remainingViews !== null && (
        <p>Remaining views: {paste.remainingViews}</p>
      )}
    </div>
  );
}
