import Login from './Login.js'
import Home from './Home.js'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Signup.js';
import SignupVendor from './SignupVendor.js';
import SignupConsumer from './SignupConsumer.js';
import SignupRider from './SignupRider.js';
import Browse from './Browse.js';
import RiderHome from './RiderHome.js';
import VendorHome from './VendorHome.js';
import Menu from './Menu.js';
import Cart from './Cart.js';

function App() {
  return (
    <Router>
      <div>
        <h1 className="display-4 bg-danger my-0 py-2"><i className="bi bi-cart-check-fill ms-2" style={{"color":"white"}}></i><span className="fw-bold ms-2 text-white">FoodSwings</span></h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signupVendor" element={<SignupVendor />}/>
          <Route path="/signupConsumer" element={<SignupConsumer />}/>
          <Route path="/signupRider" element={<SignupRider />}/>
          <Route path="/browse" element={<Browse />}/>
          <Route path="/riderHome" element={<RiderHome />}/>
          <Route path="/vendorHome" element={<VendorHome />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
        <hr/>
        <footer className="lead text-center">FoodSwings 2021</footer>
      </div>
    </Router>
  );
}

export default App;
