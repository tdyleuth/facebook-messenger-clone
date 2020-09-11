import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        db.collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
            });
    }, []);

    // userEffect - Code gets executed based on a condition in REACT
    useEffect(() => {
        setUsername(prompt("Please enter your name"));
    }, []); //condition (if let blank code runs ONCE when the app component loads)

    console.log("username", username);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection("messages").add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    return (
        <div className='App'>
            <img
                className='fb-messenger-icon'
                alt='facebook messenger icon'
                src='https://cdn.iconscout.com/icon/free/png-512/facebook-messenger-2-569346.png'
            />

            <h1>Facebook Messenger</h1>
            <h2>Welcome {username}</h2>
            <form className='app-form'>
                <FormControl className='app-formControl'>
                    <Input
                        className='app-input'
                        placeholder='Enter a message..'
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />

                    <IconButton
                        className='app_iconButton'
                        disabled={!input}
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={sendMessage}
                    >
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>

            <FlipMove>
                {messages.map(({ id, message }) => (
                    <Message key={id} username={username} message={message} />
                ))}
            </FlipMove>
        </div>
    );
}

export default App;
