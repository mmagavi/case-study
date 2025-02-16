import React from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="App">
      <div className="header">
          PartSelect
      </div>
      <div className="menu">
        <div className="menu_item"> Find by Brand ▼ </div>
        <div className="menu_item"> Find by Product ▼ </div>
        <div className="menu_item"> Find by Symptom </div>
        <div className="menu_item"> Contact </div>
        <div className="menu_item"> Blog </div>
        <div className="menu_item"> Repair Help</div>
        <div className="menu_item"> Water Filters </div>
        <div className="bold_menu_item"> Chat with an Agent </div>
      </div>
      <ChatWindow/>
      </div>
  );
}

export default App;