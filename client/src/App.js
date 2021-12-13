import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './Home.js'
import Login from './Login.js'
import Signup from './Signup.js';
import OrderHistory from './OrderHistory.js';
import ViewOrder from './ViewOrder.js';

import ConsumerHome from './ConsumerHome.js';
import Browse from './Browse.js';
import Menu from './Menu.js';
import Cart from './Cart.js';
import Checkout from './Checkout.js';

import VendorHome from './VendorHome.js';
import UpdateMenu from './UpdateMenu.js';

import RiderHome from './RiderHome.js';
import RiderOrderHistory from './RiderOrderHistory.js';
import TrackOrder from './TrackOrder.js';
import ActiveOrdersConsumer from './ActiveOrdersConsumer.js';
import ActiveOrdersVendor from './ActiveOrdersVendor.js';
import ActiveOrdersRider from './ActiveOrdersRider.js';

function App() {
  return (
    <div>
      <Router>
          <h1 className="display-4 bg-danger my-0 py-2"><i className="bi bi-cart-check-fill ms-2" style={{"color":"white"}}></i><span className="fw-bold ms-2 text-white">FoodSwings</span></h1>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />}/>
              
              <Route path="/orderHistory" element={<OrderHistory />}/>
              <Route path="/viewOrder" element={<ViewOrder />}/>

              <Route path="/consumer/Home" element={<ConsumerHome />}/>
              <Route path="/consumer/browse" element={<Browse />}/>
              <Route path="/consumer/menu" element={<Menu />}/>
              <Route path="/consumer/cart" element={<Cart />}/>
              <Route path="/consumer/checkout" element={<Checkout />}></Route>
              <Route path="/consumer/trackOrder" element={<TrackOrder />}></Route>
              <Route path="/consumer/activeOrders" element={<ActiveOrdersConsumer />}></Route>

              <Route path="/vendor/Home" element={<VendorHome />}/>
              <Route path="/vendor/updateMenu" element={<UpdateMenu />}/>
              <Route path="/vendor/activeOrders" element={<ActiveOrdersVendor />}></Route>

              <Route path="/rider/Home" element={<RiderHome />}/>
              <Route path="/rider/orderHistory" element={<RiderOrderHistory />}/>
              <Route path="/rider/activeOrders" element={<ActiveOrdersRider />}></Route>
          </Routes>
        </Router>
        <br /><br /> <br />
      <footer className="page-footer text-center" style={{
          "height": "30px",
          "width": "100%",
          "borderTop": "2px solid crimson"
        }}>
            <div className="footer-copyright text-center py-3">
              <span className="text-primary">© 2021 Copyright: </span>
              <span className="fw-bold">FoodSwings</span>
            </div>
      </footer>
    </div>
  );
}

export default App;
