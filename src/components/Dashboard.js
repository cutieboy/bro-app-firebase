import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { firestore } from '../firebase'

import Chatroom from './Chatroom'
import FriendsList from './FriendsList'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function Dashboard() {
    //TODO: Add error when ready for error-handling
    const [error, setError] = useState('')
    const [chatroomId, setChatroomId] = useState('')

    const chatroomDatabase = firestore.collection('chatrooms')
    const [chatrooms] = useCollectionData(chatroomDatabase)

    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('./login')
        } catch(err) {
            setError(err.message)
        }
    }

    function startChat(userOne, userTwo) {
        if(userOne === undefined || userTwo === undefined) {
            return console.log("Chat Id Invalid")
        }

        const newChatroomId = (Math.random() + 1).toString(36).substring(2);
        let chatroomExists = false;

        chatrooms.forEach((e) => {
            if(e.userTwo === userOne && e.userOne === userTwo) {
                setChatroomId(e.chatroomId)
                return chatroomExists = true;
            }

            if(e.userOne === userOne && e.userTwo === userTwo) {
                setChatroomId(e.chatroomId)
                return chatroomExists = true;
            }
        })

        if(chatroomExists) return console.log('this chatroom exists')

        chatroomDatabase.add({
            chatroomId: newChatroomId,
            userOne: userOne,
            userTwo: userTwo
        })

        return setChatroomId(newChatroomId)
    }

    return (
        <div className="dashboard">
            {error && <div>{error}</div>}
                <FriendsList startChat={startChat} />
                {chatroomId && <Chatroom className="chatroom" chatroomId={chatroomId} />}
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export default Dashboard
