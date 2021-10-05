import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    const emailRef = useRef()
    const { forgotPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleForgotPassword(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setMessage(`If the email exists, an email has been sent to ${emailRef.current.value}.`)
            setLoading(true)
            await forgotPassword(emailRef.current.value)
        } catch(err) {
            return null;
        }
        setLoading(false)
    }
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleForgotPassword}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required />
                        </Form.Group>
                        <Button disable={loading} className="w-100 mb-4 mt-4" type="submit">Reset Password</Button>
                        <div className="text-center">
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default ForgotPassword
