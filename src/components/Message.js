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

    let html_text = marked(content);
    let message_container_class = `${role}-message-container`;
    let message_class = `message ${role}-message`;
    
    return(
        <div key={index} className={message_container_class}>
            <div className={message_class}>
                <div  className="content" dangerouslySetInnerHTML={{ __html: html_text }} />
                {link && (<div className="link-box"><a href={link}>🔩 Visit part page on PartSelect.com </a></div>)}
            </div>
        </div>
    )
}