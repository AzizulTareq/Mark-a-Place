import axios from "axios";
import { useRef, useState } from "react";
import { FaUserAlt } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import "./login.css";

export default function Login({ setShowLogin, myStorage, setCurrentuser}) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username)
      setCurrentuser(res.data.username)
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="login-logo">
        
        <span><FaUserAlt /> &nbsp;Login</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <ImCancelCircle className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}