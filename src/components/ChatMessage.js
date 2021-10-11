import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function ChatMessage(props) {
    const {currentUser} = useAuth()
    const { text, uid, createdAt, displayName } = props.message

    return (
        <div className="message">
            <p className={`message-display-name ${uid === currentUser.uid ? 'message-yours': 'message-not-yours'}`}>{`${displayName}:`}</p>
            <p className="message-text">{text}</p>
            {/* <p className="message-time">{createdAt && createdAt.toDate().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}</p> */}
        </div>
    )
}

export default ChatMessage
