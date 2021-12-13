import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

const Cart = () => {
    const navigate = useNavigate();
    const { state } = useLocation();    
    const [items, setItems] = React.useState(state.items)
    const [totalPrice, setTotalPrice] = React.useState(state.total_price)
    const [errMsg, setErrMsg] = React.useState('')

    const removeItem  = async (ev, item)  => {
        ev.preventDefault();
        try{
            await axios.post('https://foodswings.herokuapp.com/consumer/removeFromCart', {name: item.name, price: item.price}, {withCredentials: true});
            const res = await axios.get('https://foodswings.herokuapp.com/consumer/cart',  {withCredentials: true});
            if(res.data.items.length === 0){
                navigate('/consumer/browse')
            }
            let amount = 0
            res.data.items.forEach((element) => {
                amount += element.price*element.qty
            })
            setTotalPrice(amount)
            setItems(res.data.items)
        } catch(err) {
            if(err.response)
                navigate('/consumer/browse')
        }
    }

    const goToCheckout = async (ev) => {
        ev.preventDefault();
        try{
            const res = await axios.get('https://foodswings.herokuapp.com/consumer/checkout',  {withCredentials: true});
            navigate('/consumer/checkout', {state: {
                totalPrice: totalPrice,
                creditCards: res.data.creditCards,
                wallet: res.data.wallet,
                city: res.data.city,
                area: res.data.area,
                street_num: res.data.street_num,
                building_num: res.data.building_num,
                phone_num: res.data.phone_num
            }})
        } catch(err) {
            if(err.response)
                setErrMsg(err.response.data.err)
        }
    }

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Shopping Cart</h2>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr className="bg-danger text-white fw-bold">
                                    <td></td>
                                    <td>Item</td>
                                    <td>Qty</td>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map((element, index) => (
                                <tr key={index}>
                                    <td><i className="bi bi-x-circle-fill" style={{"color":"red"}} onClick={(ev) => {removeItem(ev, element)}}></i></td>
                                    <td>{element.name}</td>
                                    <td>{element.qty}</td>
                                    <td>{element.price*element.qty}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="bg-danger text-white fw-bold">{totalPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                <div className="row text-center">
                    <div className="col text-center">
                    <button className="btn btn-lg btn-danger fw-bold rounded-pill border" style={{
                        "width":"35%"
                    }} onClick={goToCheckout}>Proceed to checkout</button>
                    </div>
                    <h2 className="lead text-danger ms-2">{errMsg}</h2>
                </div>
            </div>
    
        </div>
     );
}
 
export default Cart;
