import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'

import Friend from './Friend'

function FriendsList(props) {

    const { currentUser } = useAuth()
    const userDatabase = firestore.collection('users')
    const [users] = useCollectionData(userDatabase)
    const startChat = props.startChat

    return (
        <div className="friends-list">
            {users && users.map((user) => {
                if(user.username === currentUser.displayName) {
                    return null
                }
                return <Friend startChat={startChat} key={user.chatId} username={user.username} chatId={user.chatId} />
            })}
        </div>
    )
}

export default FriendsList
