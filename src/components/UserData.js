import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function UserData() {
    const {returnUserData} = useAuth()

    return (
        <div>
            <button onClick={returnUserData}></button>
        </div>
    )
}

export default UserData
