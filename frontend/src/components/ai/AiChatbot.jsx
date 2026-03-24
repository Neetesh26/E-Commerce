import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const AiChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I'm your shopping assistant. Ask me about products, orders, or anything else!",
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Build history array from messages for backend
  const buildHistory = (msgs) => {
    return msgs
      .filter((m) => m.type === "text") // only text messages
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));
  };

  const sendMessage = async (overrideText) => {
    const userMessage = (overrideText || input).trim();
    if (!userMessage) return;

    const updatedMessages = [
      ...messages,
      { role: "user", text: userMessage, type: "text" },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/chat", {
        message: userMessage,
        history: buildHistory(updatedMessages), // ✅ send history
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: res.data.reply,
          type: res.data.type,
          data: res.data.data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong ❌", type: "text" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "Show men products",
    "Show women products",
    "Products under 500",
    "Track my order",
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl transition-all"
      >
        {open ? "✕" : "🤖"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-80 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200">

          <div className="bg-indigo-600 text-white p-3 rounded-t-xl flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <div>
              <p className="font-semibold text-sm">AI Shopping Assistant</p>
              <p className="text-xs text-indigo-200">Powered by Groq</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.type !== "products" && (
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                )}

                {msg.type === "products" && msg.data?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 ml-1">
                      Found {msg.data.length} products:
                    </p>
                    {msg.data.map((p) => (
                      <div
                        key={p._id}
                        className="border border-gray-200 rounded-xl p-2 flex gap-3 hover:shadow-md transition cursor-pointer"
                      >
                        <img
                          src={p.images?.[0] || "/placeholder.png"}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-lg"
                        />
                        <div className="flex flex-col justify-center">
                          <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                            {p.name}
                          </p>
                          <p className="text-green-600 font-bold text-sm">
                            ₹{p.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 text-sm text-gray-500 animate-pulse">
                  Typing...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-3 pb-1 flex flex-wrap gap-1">
              {quickReplies.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-1 rounded-full hover:bg-indigo-100 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 p-3 border-t border-gray-100">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-indigo-400"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChatbot;