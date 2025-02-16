import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage } from "../api/gptApi";
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

      // Check if the user input contains a part ID

      // Get the part ID from the input
      const part_id = getPartID(input);
      let my_link = null;

      // If we have a part id, use it to get the relevant part information
      if (part_id) {
        my_link = "https://www.partselect.com/" + part_id + "-.htm";
        console.log(my_link);

        // Try to get the relevant information for the part
        let get_part_info = await getPartInfo(part_id);
        if (get_part_info) {
          input += "The part information for the part mentioned above is: " + get_part_info;
          console.log(input);
        } 
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
