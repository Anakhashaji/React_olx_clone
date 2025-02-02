import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
 import {AuthContext, FirebaseContext}  from './store/Context' 
 import { auth } from './firebase/config';
 import Create from './Pages/Create';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {setUser}=useContext(AuthContext)
  const{firebase}=useContext(FirebaseContext)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe; // Clean up the subscription on unmount
  }, []);
  return (
    <div>
      <Router>
        <Route exact path="/">
           <Home />
        </Route>
        <Route path="/signup">
           <Signup />
        </Route>

        <Route path="/login">
           <Login />
        </Route>

        <Route path="/create">
           <Create />
        </Route>

      </Router>
    </div>
  );
}

export default App;
