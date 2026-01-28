"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <main style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        placeholder="Type your paste here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <br /><br />

      <button onClick={submit}>Create Paste</button>

      {url && (
        <p>
          Shareable URL: <br />
          <strong>{url}</strong>
        </p>
      )}
    </main>
  );
}
