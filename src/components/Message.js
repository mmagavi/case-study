import React from "react";
import { marked } from "marked";
import "./ChatWindow.css";
import "./Message.css"

// Create a message div based on the information we have
// If we have a link, we should provide it
export function Message(role, content, link, index) {

    let html_text = marked(content.trim());
    
    if (role == "assistant"){
        if (link) {
            // If we have a link, return an assistant message with a link
            return(
                <div key={index} className="assistant-message-container">
                    <div className="message assistant-message">
                    <div  className="content" dangerouslySetInnerHTML={{ __html: html_text }} />
                        <div className="link-box"><a href={link}>🔩 Visit part page on PartSelect.com </a></div>
                    </div>
                </div>
            )
        } else {
            // Else, return one without a link
            return(
                <div key={index} className="assistant-message-container">
                    <div className="message assistant-message">
                        <div className="content" dangerouslySetInnerHTML={{ __html: html_text}}/>
                    </div>
                </div>
            )
        }
    } else {
        // User message will always have the same style
        return(
            <div key={index}  className="user-message-container">
                <div className="message user-message">
                    <div  className="content" dangerouslySetInnerHTML={{ __html: html_text}} />
                </div>
            </div>
        )
    }
}