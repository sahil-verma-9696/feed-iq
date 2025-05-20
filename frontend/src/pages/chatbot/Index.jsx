import React, { useState, useRef, useEffect } from "react";

export default function Index() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! Ask me anything about your feedback data.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fake bot reply for demo purposes
  const botReply = (userMsg) => {
    let reply = "Sorry, I didn't understand that.";

    if (userMsg.toLowerCase().includes("sentiment")) {
      reply =
        "The overall sentiment is 65% positive, 20% neutral, and 15% negative.";
    } else if (userMsg.toLowerCase().includes("trend")) {
      reply = "Sentiment has been steadily improving over the last 5 days.";
    } else if (userMsg.toLowerCase().includes("aspect")) {
      reply = "UI and Features aspects have the highest positive feedback.";
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: reply },
      ]);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input },
    ]);
    botReply(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen  mx-auto bg-white dark:bg-gray-900 shadow-lg p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Chat with your Data
      </h1>

      <div
        className="flex-1 overflow-y-auto mb-4 space-y-4 px-2"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map(({ id, sender, text }) => (
          <div
            key={id}
            className={`flex ${
              sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              {text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
