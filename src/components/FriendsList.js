import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'

import Friend from './Friend'

function FriendsList(props) {

    const { currentUser, logout } = useAuth()
    const userDatabase = firestore.collection('users')
    const [users] = useCollectionData(userDatabase)

    const [search, setSearch] = useState('')

    const history = useHistory()

    async function handleLogout() {
        try {
            await logout()
            history.push('./login')
        } catch(err) {
            console.log(err.message)
        }
    }

    const startChat = props.startChat

    return (
        <div className="friends-list component">
            <div className="header">
                <p>Friends List</p>
                <div className="box-container">
                    <div className="box">
                            <span className="box-x box-x-right"></span>
                            <span className="box-x box-x-left"></span>
                    </div>
                </div>
            </div>
            <div className="friends-search-container">
                <input type="text" placeholder="Search..." onChange={(event) => setSearch(event.target.value)}></input>
            </div>
            <div className="friends-container">
            {users && users.filter((user) => {
                if(search === '') return user
                
                if(user.username.toLowerCase().includes(search.toLowerCase())) return user

                return null
            }).map((user) => {
                if(user.username === currentUser.displayName) {
                    return null
                }
                return <Friend startChat={startChat} key={user.chatId} username={user.username} chatId={user.chatId} />
            })}
            </div>
            <button className="friends-logout-btn" variant="link" onClick={handleLogout}>Log Out</button>
        </div>
    )
}


export default FriendsList
