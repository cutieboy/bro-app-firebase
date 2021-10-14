import React, { useState, useEffect, useRef } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'

import Friend from './Friend'

function FriendsList(props) {

    const { currentUser } = useAuth()
    const userDatabase = firestore.collection('users')
    const [users] = useCollectionData(userDatabase)

    const searchRef = useRef()
    const friendsRef = useRef()

    const [search, setSearch] = useState('')
    const [loading, isLoading] = useState(true)
    const [frendsList, setFriendsList] = useState([])

    useEffect(() => {
        if(loading) return isLoading(false)
        // setFriendsList(Array.from(friendsRef.current.children))

        // if(!search) {

        // }

        
    }, [search])
    
    const startChat = props.startChat

    if(loading) {
        return 'loading...'
    } else {
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
                <div className="friends-search-container">
                    <input ref={searchRef} onKeyUp={() => setSearch(searchRef.current.value)} type="text" placeholder="Search..."></input>
                </div>
                <div ref={friendsRef} className="friends-container">
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
    }

export default FriendsList
