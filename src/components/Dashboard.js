import React, { useState } from 'react'
import { firestore } from '../firebase'

import Chatroom from './Chatroom'
import FriendsList from './FriendsList'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function Dashboard() {
    //TODO: Add error when ready for error-handling
    const [chatroomId, setChatroomId] = useState('')

    const chatroomDatabase = firestore.collection('chatrooms')
    const [chatrooms] = useCollectionData(chatroomDatabase)

    function startChat(userOne, userTwo) {
        if(userOne.chatId === undefined || userTwo.chatId === undefined) {
            return console.log("Chat Id Invalid")
        }

        const newChatroomId = (Math.random() + 1).toString(36).substring(2);
        let chatroomExists = false;

        chatrooms.forEach((e) => {
            if(e.userTwo === userOne.username && e.userOne === userTwo.username) {
                setChatroomId(e.chatroomId)
                return chatroomExists = true;
            }

            if(e.userOne === userOne.username && e.userTwo === userTwo.username) {
                setChatroomId(e.chatroomId)
                return chatroomExists = true;
            }
        })

        if(chatroomExists) return

        chatroomDatabase.add({
            chatroomId: newChatroomId,
            userOne: userOne.username,
            userTwo: userTwo.username,
        })

        return setChatroomId(newChatroomId)
    }

    return (
        <div className="dashboard">
                <FriendsList startChat={startChat} />
                {chatroomId && <Chatroom className="chatroom" chatroomId={chatroomId} />}
        </div>
    )
}

export default Dashboard
