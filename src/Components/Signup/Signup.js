import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../../firebase/config'; // Import Firestore instance from config.js
import { collection, addDoc } from 'firebase/firestore';
import './Signup.css';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Retrieve Firebase app instance from context
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('username')

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update the user's display name
        return updateProfile(result.user, { displayName: username }).then(() => {
          // Add user to Firestore
          return addDoc(collection(db, 'users'), {
            id: result.user.uid,
            username: username,
            phone: phone
          });
        });
      })
      .then(() => {
        console.log('User profile updated and added to Firestore successfully');
        history.push('/login');
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
