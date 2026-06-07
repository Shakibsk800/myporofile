import { useState, useRef, useEffect } from "react";
import { sendChatMessage, ChatMessage, getAIName, getContactEmail } from "../utils/groqService";

interface AIDemoProps {
  onClose: () => void;
}

export const AIDemo = ({ onClose }: AIDemoProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    // Handle /contact command
    if (userMessage.toLowerCase() === "/contact") {
      const contactMessage = `📧 **Contact Information**\n\nEmail: ${getContactEmail()}\n\nFeel free to reach out!`;
      setMessages((prev) => [...prev, { role: "assistant", content: contactMessage }]);
      setLoading(false);
      return;
    }

    const response = await sendChatMessage(messages, userMessage);
    setLoading(false);

    if (response.success && response.message) {
      setMessages((prev) => [...prev, { role: "assistant", content: response.message }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${response.error || "Failed to get response"}` },
      ]);
    }
  };

  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, i) => (
      <div key={i}>
        {line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
          part.startsWith("**") ? (
            <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
          ) : part.toLowerCase().includes("email:") && part.includes("@") ? (
            <a key={j} href={`mailto:${getContactEmail()}`} className="text-violet-400 hover:underline">
              {part}
            </a>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full h-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-violet-500/20 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{getAIName()}</h2>
            <p className="text-white/70 text-sm">Powered by Groq - Full Demo</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-5xl mb-4">👋</div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome to AI Demo</h3>
                <p className="text-slate-400 mb-4">Ask me anything about web development, technology, or Shakib's portfolio!</p>
                <p className="text-slate-500 text-sm">Type <span className="text-violet-400 font-mono">/contact</span> to see contact info</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-slate-700 text-slate-100"
                  }`}
                >
                  <div className="text-sm">{renderMessageContent(msg.content)}</div>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 px-4 py-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-violet-500/20 p-4 bg-slate-900/50">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything... (type /contact for email)"
              disabled={loading}
              className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-3 border border-violet-500/20 focus:border-violet-500 focus:outline-none disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg px-6 py-3 font-medium hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
