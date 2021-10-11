import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'

function Friend(props) {
    const { currentUser } = useAuth()
    const userDatabase = firestore.collection("users")
    const query = userDatabase.where("username", "==", currentUser.displayName)
    const [user] = useCollectionData(query)

    const username = props.username
    const chatId = props.chatId
    const startChat = props.startChat

    return (
        <div className="friend" onClick={
            () => startChat(user[0].chatId, chatId)
        }>
            <p>Username: {username}</p>
            <p>ChatID: {chatId}</p>
        </div>
    )
}

export default Friend
