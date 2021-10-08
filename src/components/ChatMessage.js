import React from 'react'
import './styles/ChatMessage.css'
import { useAuth } from '../contexts/AuthContext'

function ChatMessage(props) {
    const {currentUser} = useAuth()
    const { text, uid, createdAt, displayName } = props.message

    return (
        <div className={`message ${uid === currentUser.uid ? 'message-yours': 'message-not-yours'}`}>
            <p>{displayName}</p>
            <p>{text}</p>
            <p>{createdAt && createdAt.toDate().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}</p>
        </div>
    )
}

export default ChatMessage
