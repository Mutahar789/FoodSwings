import './index.css';
import Login from './Login.js'
import Home from './Home.js'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Signup.js';
import SignupVendor from './SignupVendor.js';
import SignupConsumer from './SignupConsumer.js';
import SignupRider from './SignupRider.js';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>FoodSwings</h1>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signupVendor" element={<SignupVendor />}/>
          <Route path="/signupConsumer" element={<SignupConsumer />}/>
          <Route path="/signupRider" element={<SignupRider />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
