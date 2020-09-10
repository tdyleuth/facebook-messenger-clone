import React from "react";
import { CardContent, Card, Typography } from "@material-ui/core";
import "./Message.css";

function Message({ message, username }) {
    const isUser = username === message.username;
    return (
        <div className={`message ${isUser && "message-user"}`}>
            <Card className={isUser ? "message-userCard" : "message-guestCard"}>
                <CardContent>
                    <Typography color='white' variant='h5' component='h2'>
                        {message.username}: {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Message;
