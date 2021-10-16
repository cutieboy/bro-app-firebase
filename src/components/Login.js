import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
    }
    
    return (
        <>
            {error && <Alert className="alert" variant="danger">{error}</Alert>}
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
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input id="email" ref={emailRef} type="email" required />
                    <label>Password</label>
                    <input id="password" ref={passwordRef} type="password" required />
                    <button>Login</button>
                </form>
                <Link to="/forgot-password">Forgot Password?</Link>
                <div className="login-signup"><p>Don't have an account?</p><Link to="/signup">Sign Up</Link></div>
            </div>
        </>
    )
}

export default Login
