import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
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
            await userDatabase.add({
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
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={usernameRef} type="text" required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" required />
                        </Form.Group>
                        <Form.Group id="password-confirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control ref={passwordConfirmRef} type="password" required />
                        </Form.Group>
                        <Button disable={loading.toString()} className="w-100 mb-4 mt-4" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Signup
