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
        <div className="friends-list component">
            <div className="friends-list-header">
                <p>Friends List</p>
                <div className="box-container">
                    <div className="box">
                            <span className="box-x box-x-right"></span>
                            <span className="box-x box-x-left"></span>
                    </div>
                </div>
            </div>
            <div className="friends-container">
            {users && users.map((user) => {
                if(user.username === currentUser.displayName) {
                    return null
                }
                return <Friend startChat={startChat} key={user.chatId} username={user.username} chatId={user.chatId} />
            })}
            </div>
        </div>
    )
}

export default FriendsList
