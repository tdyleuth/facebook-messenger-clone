import React, { useState } from "react";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    console.log("input", input);
    console.log("Messages", messages);

    const sendMessage = (event) => {
        // When send messages button is clicked input message is appended to the array of curret messages
        setMessages([...messages, input]);
        setInput("");
    };

    return (
        <div className='App'>
            <h1>Facebook Messenger</h1>

            <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />

            <button onClick={sendMessage}>Send Message</button>
            {messages.map((message) => (
                <p>{message}</p>
            ))}
        </div>
    );
}

export default App;
