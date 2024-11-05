import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {useHistory} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);
 const history=useHistory()
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    // Firebase authentication login function
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push('/')
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
