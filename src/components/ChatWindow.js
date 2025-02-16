import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage } from "../api/api";
import { getPartID } from "../api/getPartID";
import {scrape} from "../api/getPartInfo";
import {Message} from "./Message"

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
      let my_link = null;
      if (id) {
        my_link = "https://www.partselect.com/" + id + "-.htm"
        console.log(my_link)
        let site_content = await scrape(my_link)
      }
      let my_response = await getAIMessage(input);
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
