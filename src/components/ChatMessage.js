import React from 'react'
import './styles/ChatMessage.css'
import { useAuth } from '../contexts/AuthContext'

function ChatMessage(props) {
    const {currentUser} = useAuth()
    const { text, uid, createdAt } = props.message

    return (
        <div className={`message ${uid === currentUser.uid ? 'message-yours': 'message-not-yours'}`}>
            <p>{text}</p>
            <p onClick={() => console.log("message uid "+uid)}>{createdAt && createdAt.toDate().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}</p>
        </div>
    )
}

export default ChatMessage
