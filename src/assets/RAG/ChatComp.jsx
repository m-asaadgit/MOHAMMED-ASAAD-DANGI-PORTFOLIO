import React, { useState, useRef, useEffect } from "react";

const CHAT_API_URL = "http://localhost:5000/api/chat";

const SUGGESTIONS = ["Skills", "Projects", "Experience", "Education", "Contact"];

function ChatComp({ open, onClose }) {
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi! Ask me anything about Asaad's resume." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading, open]);

  const send = async (text) => {
    const q = text.trim();
    if (!q || loading) return;

    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) throw new Error("Request failed");

      setMsgs((m) => [...m, { from: "bot", text: json.data.answer }]);
    } catch (err) {
      setMsgs((m) => [
        ...m,
        { from: "bot", text: "Sorry, I couldn't reach the server. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        .chat-panel { position: fixed; right: 20px; bottom: 20px; width: 560px; max-width: calc(100vw - 24px); height: 480px; max-height: calc(100vh - 40px);
          display: flex; flex-direction: column; background: #0d1219; border: 1px solid rgba(0,168,255,0.35); border-radius: 14px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6); z-index: 1000; font-family: 'Sora', sans-serif; }
        .chat-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; font-weight: 600; color: #eaf2ff; }
        .chat-close { background: none; border: none; color: #7a9bbf; font-size: 20px; cursor: pointer; line-height: 1; }
        .chat-close:hover { color: #fff; }
        .chat-body { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
        .chat-msg { max-width: 85%; padding: 8px 12px; border-radius: 10px; font-size: 12.5px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
        .chat-msg.bot { align-self: flex-start; background: rgba(255,255,255,0.06); color: #c9d6e3; }
        .chat-msg.user { align-self: flex-end; background: #00a8ff; color: #001522; }
        .chat-msg.thinking { opacity: 0.7; font-style: italic; }
        .chat-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; }
        .chat-chip { background: rgba(0,168,255,0.1); color: #00a8ff; border: 1px solid rgba(0,168,255,0.3); border-radius: 999px; font-size: 11px; font-family: 'DM Mono', monospace; padding: 3px 10px; cursor: pointer; }
        .chat-chip:hover { background: rgba(0,168,255,0.2); }
        .chat-chip:disabled { opacity: 0.5; cursor: not-allowed; }
        .chat-input-row { display: flex; gap: 8px; padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.08); }
        .chat-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #eaf2ff; padding: 8px 10px; font-size: 12.5px; outline: none; font-family: inherit; }
        .chat-input:focus { border-color: rgba(0,168,255,0.6); }
        .chat-send { background: #00a8ff; color: #001522; border: none; border-radius: 8px; padding: 0 14px; font-weight: 600; cursor: pointer; }
        .chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 480px) { .chat-panel { right: 6px; bottom: 6px; height: 70vh; } }
      `}</style>

      <div className="chat-panel" role="dialog" aria-label="Resume chatbot">
        <div className="chat-head">
          <span>💬 Resume Assistant</span>
          <button className="chat-close" onClick={onClose} aria-label="Close chat">×</button>
        </div>

        <div className="chat-body">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.from}`}>{m.text}</div>
          ))}
          {loading && <div className="chat-msg bot thinking">Thinking…</div>}
          <div ref={endRef} />
        </div>

        <div className="chat-chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="chat-chip" onClick={() => send(s)} disabled={loading}>
              {s}
            </button>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about my resume..."
            disabled={loading}
          />
          <button className="chat-send" onClick={() => send(input)} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatComp;