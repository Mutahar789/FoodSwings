import { useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

const Cart = () => {
    const { state } = useLocation();
    const [shoppingCart, setShoppingCart] = React.useState([])
    

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Shopping Cart</h2>
            <br />
            <ul className="list-group">
                {state.items.map((item, index) => (
                    <li key={index} className="list-group-item disabled" aria-disabled="true">{item.name}, {item.price}, {item.qty} </li>
                ))}
            </ul>
        </div>
     );
}
 
export default Cart;
