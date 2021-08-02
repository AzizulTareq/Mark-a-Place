import React, {useState, useRef} from 'react'
import './register.css'
import { FaUserAlt } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import axios from 'axios'

const Register = ({ setShowRegister }) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try{
            await axios.post('/users/register', newUser)
            setError(false)
            setSuccess(true)
        } catch (err) {
            setError (true);
        }


    }
    return (
        <div className="registerContainer">
            <div className="logo">
            <FaUserAlt /> &nbsp;Create An Account
            </div>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef} />
            <input type="email" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerBtn">Register</button>
            {success && (
                <span className="success">Account created successfully</span>
            )}
            
            {error && (
                <span className="failure">Something went wrong</span>
            )}
            </form>
            <ImCancelCircle className="registerCross" onClick={() => setShowRegister(false)} />
        </div>
    )
}

export default Register
