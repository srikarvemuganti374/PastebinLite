"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [fullUrl, setFullUrl] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    setFullUrl(baseUrl + data.url);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={10}
        cols={60}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your paste here"
      />

      <br /><br />
      <button onClick={createPaste}>Create Paste</button>

      {fullUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Sharable URL:</p>

          <a href={fullUrl} target="_blank" rel="noopener noreferrer">
            {fullUrl}
          </a>

          <br /><br />

          <button
            onClick={() => navigator.clipboard.writeText(fullUrl)}
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
