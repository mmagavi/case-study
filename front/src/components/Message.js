import React from "react";
import { marked } from "marked";
import "./ChatWindow.css";
import "./Message.css"

/**
 * Create a div for message
 * @param {*} role String "assistant" or "user"
 * @param {*} content Message content to be displayed
 * @param {*} link A link to the part page, or null 
 * @param {*} index Key to map messages
 * @returns 
 */
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