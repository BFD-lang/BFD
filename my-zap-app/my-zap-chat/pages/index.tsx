import React, { useState, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/messages")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  const sendMessage = async () => {
    await fetch("/messages", {
      method: "POST",
      body: JSON.stringify({ user: "you", content: input }),
      headers: { "Content-Type": "application/json" },
    });
    setInput("");
    const res = await fetch("/messages");
    setMessages(await res.json());
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>💬 Zap Chat</h2>
      <div>
        {messages.map((m: any, i) => (
          <div key={i}>
            <strong>{m.user}:</strong> {m.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
