import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getServerResponse } from "../api/serverRequest";
import { Message } from "./Message"

/**
 * Component for the chat window
 */
function ChatWindow() {

  const defaultMessage = [{
    role: "assistant",
    content: "Hello, how can I help you today?"
  }];

  const [messages,setMessages] = useState(defaultMessage)
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const handleSend = async (input) => {
    if (input.trim() !== "") {
      // Set user message
      setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
      setInput("");

      // Show loading sign
      setLoading(true);

      let my_response = await getServerResponse(input);

      // My link will be null if there was no Part ID provided. That's okay, because it won't be used.
      // Don't display loading sign
      setLoading(false);
      setMessages(prevMessages => [...prevMessages, {role: "assistant", content: my_response}]);
    }
  };

  return (
      <div className="messages-container">
          {messages.map((message, index) => (
              Message(message.role, message.content, message.link, index)
          ))}
          {loading && (
            <div className="loading">
              <p>Loading...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSend(input);
                  e.preventDefault();
                }
              }}
              rows="3"
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
      </div>
);
}

export default ChatWindow;
