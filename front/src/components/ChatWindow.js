import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage } from "../api/api";
import { getPartID } from "../api/getPartID";
import { getPartInfo } from "../api/getPartInfo";
import {Message} from "./Message"

/**
 * Component for the chat window
 */
function ChatWindow() {

  const defaultMessage = [{
    role: "assistant",
    content: "Hello, how can I help you today?",
    link: null
  }];

  const [messages,setMessages] = useState(defaultMessage)
  const [input, setInput] = useState("");

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

      const id = getPartID(input);
      let part_id = null;
      let my_link = null;
      if (part_id) {
        my_link = "https://www.partselect.com/" + part_id + "-.htm";
        console.log(my_link);

        // ADD CODE HERE TO PUT THE WEB CONTENT IN THE QUERY
        my_server_response = await getPartInfo(part_id);
        console.log(my_server_response);

      }
      let my_response = await getAIMessage(input);
      // My link will be null if there was no Part ID provided. That's okay, because it won't be used.
      setMessages(prevMessages => [...prevMessages, {role: "assistant", content: my_response, link: my_link}]);
    }
  };

  return (
      <div className="messages-container">
          {messages.map((message, index) => (
              Message(message.role, message.content, message.link, index)
          ))}
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
