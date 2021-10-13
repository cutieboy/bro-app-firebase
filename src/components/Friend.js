import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'

function Friend(props) {
    const { currentUser } = useAuth()
    const userDatabase = firestore.collection("users")
    const userQuery = userDatabase.where("username", "==", currentUser.displayName)
    const [user] = useCollectionData(userQuery)

    const username = props.username
    const chatId = props.chatId
    const startChat = props.startChat

    let enterChatAudio = new Audio('../../enterChat.mp3')

    return (
        <div className="friend" onClick={
            () => {
                startChat(
                {
                    chatId: user[0].chatId, 
                    username: user[0].username
                }, 
                {
                    chatId: chatId,
                    username: username
                }
                )
                enterChatAudio.play()
        }
        }>
            <p>{username}</p>
        </div>
    )
}

export default Friend
