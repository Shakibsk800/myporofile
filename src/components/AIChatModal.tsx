import { useState, useEffect, useRef } from "react";
import { sendChatMessage, ChatMessage, getContactEmail, getAIName } from "../utils/groqService";

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

export function AIChatModal({ isOpen, onClose, onOpenDemo }: AIChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessageContent = (content: string) => {
    const contactEmail = getContactEmail();
    const parts = content.split(/(\*\*.*?\*\*|`\/.*?`|https?:\/\/\S+)/g);

    return (
      <div className="space-y-2 text-sm leading-relaxed break-words">
        {parts.map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <span key={idx} className="font-semibold text-white">
                {part.slice(2, -2)}
              </span>
            );
          }
          if (part.includes("@")) {
            return (
              <a
                key={idx}
                href={`mailto:${contactEmail}`}
                className="text-violet-400 hover:text-violet-300 underline"
              >
                {part}
              </a>
            );
          }
          return (
            <span key={idx}>
              {part.split("\n").map((line, lineIdx) => (
                <div key={lineIdx}>{line}</div>
              ))}
            </span>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setInput("");
    setLoading(true);

    // Handle /contact command
    if (userInput.toLowerCase() === "/contact") {
      const contactEmail = getContactEmail();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `📧 **Contact Information**\n\nYou can reach Shakib at:\n\n**Email:** ${contactEmail}\n\nClick the email link to send a message, or use the contact form on the portfolio to get in touch!`,
        },
      ]);
      setLoading(false);
      return;
    }

    // Regular AI response
    const response = await sendChatMessage(messages, userInput);

    if (response.success && response.message) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.message! },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.error || "Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-violet-500/20 overflow-hidden flex flex-col max-h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-white font-bold">{getAIName()}</h3>
            <p className="text-white/70 text-xs">Powered by Groq</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDemo}
              className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-all flex items-center gap-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="hidden sm:inline">Live Demo</span>
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-slate-800 text-slate-200 border border-violet-500/20"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="text-sm leading-relaxed break-words">
                    {msg.content}
                  </p>
                ) : (
                  renderMessageContent(msg.content)
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-200 border border-violet-500/20 px-4 py-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-700 p-4 bg-slate-900/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything... (type /contact for email)"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 transition-all"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
