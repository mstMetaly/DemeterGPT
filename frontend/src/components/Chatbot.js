import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [userInput, setUserInput] = useState(""); // Tracks user input
  const chatContainerRef = useRef(null); // Ref for scrolling the chat

  // Function to handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear user input
    setUserInput("");

    try {
      // Simulate API call to backend (Replace with your actual API endpoint)
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.bot_response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Something went wrong. Please try again." },
      ]);
    }
  };

  // Scroll to the bottom of chat on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-header">DemeterGPT</div>

      <div className="chat-window" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export { Chatbot };

/* Chatbot.css */


