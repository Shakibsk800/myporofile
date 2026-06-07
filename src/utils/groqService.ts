// Groq AI Chat Service
const GROQ_API_KEY = "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";
const GROQ_API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const CONTACT_EMAIL = "shakibskty@gmail.com";
const AI_NAME = "Shakib Sheikh ai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const getContactEmail = () => CONTACT_EMAIL;
export const getAIName = () => AI_NAME;

export const sendChatMessage = async (
  messages: ChatMessage[],
  userMessage: string
): Promise<ChatResponse> => {
  try {
    const systemMessage: ChatMessage = {
      role: "assistant",
      content: `You are ${AI_NAME}, a helpful AI assistant for Shakib Sheikh's portfolio website. 
Key Information:
- AI Name: ${AI_NAME}
- Developer Name: Shakib Sheikh
- Email: ${CONTACT_EMAIL}
- Role: Full Stack Developer
- Skills: React, Next.js, TypeScript, Node.js, AWS, DevOps

When users ask about contacting, mention the email: ${CONTACT_EMAIL}
Be helpful, friendly, and professional. Answer questions about web development, technology, and the portfolio.`,
    };

    const allMessages: ChatMessage[] = [
      systemMessage,
      ...messages,
      { role: "user", content: userMessage },
    ];

    const response = await fetch(GROQ_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: allMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      return {
        success: false,
        error: data.error?.message || "Failed to get response from AI",
      };
    }

    const assistantMessage = data.choices[0]?.message?.content;
    if (!assistantMessage) {
      return {
        success: false,
        error: "No response from AI",
      };
    }

    return {
      success: true,
      message: assistantMessage,
    };
  } catch (error) {
    console.error("Chat error:", error);
    return {
      success: false,
      error: "Connection error. Please try again.",
    };
  }
};
