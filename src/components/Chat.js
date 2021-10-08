import React, { useState, useRef } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'
import firebase from 'firebase/compat/app'

import ChatMessage from './ChatMessage'

import './styles/Chat.css'

function Chat() {
    const { currentUser } = useAuth()
    const messagesRef = firestore.collection('messages')
    const scrollBottomRef = useRef()
    const query = messagesRef.orderBy('createdAt', 'desc').limit(10)

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [msgFormValue, setMsgFormValue] = useState('')
    const [error, setError] = useState('')

    async function handleMessage(e) {
        e.preventDefault()
        if(msgFormValue === '') return
        const {uid, photoURL, displayName} = currentUser

        try {
            setError('')
            messagesRef.add({
                text: msgFormValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                displayName
            })
        } catch(err) {
            setError(err.message)
        }

        setMsgFormValue('')
        scrollBottomRef.current.scrollIntoView({behavior: 'smooth'})
    }

    return(
        <>
            <div>{currentUser.displayName}</div>
            <div className="message-container">
                {messages && messages.reverse().map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={scrollBottomRef}></div>
            </div>

            <form className="message-form" onSubmit={handleMessage} >
                <input className="message-form--input" onKeyPress={(event) => {if(event.keyCode === '13') handleMessage()}} value={msgFormValue} onChange={(e) => setMsgFormValue(e.target.value)} type="text" />
                <button className="message-form--submit" type="submit">Send</button>
            </form>
        </>
    )
}

export default Chat
