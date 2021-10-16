import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link, useHistory } from 'react-router-dom'


function Signup() {
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const userDatabase = firestore.collection('users')
    const [users] = useCollectionData(userDatabase)

    async function handleSubmit(e) {
        e.preventDefault()

        const usernameExists = users.find(user => user.username === usernameRef.current.value)

        if(usernameExists) return console.log('Username already exists')

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            const result = await signup(emailRef.current.value, passwordRef.current.value)
            const newChatId = (Math.random() + 1).toString(36).substring(2)

            await result.user.updateProfile({
                displayName: usernameRef.current.value
            })
            await userDatabase.doc(usernameRef.current.value).set({
                username: usernameRef.current.value,
                chatId: newChatId,
            })
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }
    
    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="auth-container signup-container component">
                <div className="header">
                    <p>ZIM Chat</p>
                    <div className="box-container">
                        <span className="box">
                            <span className="box-minus"></span>
                        </span>
                        <span className="box">
                            <span className="box-square"></span>
                        </span>
                        <span className="box">
                                <span className="box-x box-x-right"></span>
                                <span className="box-x box-x-left"></span>
                        </span>
                    </div>
                </div>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input id="username" ref={usernameRef} type="text" required />
                    <label>Email</label>
                    <input id="email" ref={emailRef} type="email" required />
                    <label>Password</label>
                    <input id="password" ref={passwordRef} type="password" required />
                    <label>Confirm Password</label>
                    <input id="password-confirmation" ref={passwordConfirmRef} type="password" required />
                    <button disable={loading.toString()}>Sign Up</button>
                </form>
                <div className="login-signup"><p>Already have an account?</p><Link to="/login">Log in</Link></div>
            </div>
        </>
    )
}

export default Signup
