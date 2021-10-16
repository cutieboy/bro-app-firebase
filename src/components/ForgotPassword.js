import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    const emailRef = useRef()
    const { forgotPassword } = useAuth()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleForgotPassword(e) {
        e.preventDefault()
        try {
            setMessage('')
            setMessage(`If the email exists, an email has been sent to ${emailRef.current.value}.`)
            setLoading(true)
            await forgotPassword(emailRef.current.value)
        } catch(err) {
            return setMessage(err.message)
        }
        setLoading(false)
    }
    
    return (
        <>
            {message && <Alert className="alert" variant="success">{message}</Alert>}
            <div className="auth-container component">
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
                <h2 style={{fontSize: '28px'}}>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <label>Email</label>
                    <input id="email" ref={emailRef} type="email" required />
                    <button disable={loading.toString()} >Reset Password</button>
                </form>
                <div className="login-signup"><p>Already have an account?</p><Link to="/login">Back to Login</Link></div>
            </div>
        </>
    )
}

export default ForgotPassword
