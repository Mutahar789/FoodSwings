import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

const Checkout = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [selectedCard, setSelectedCard] = React.useState('')

    const [usingWallet, setUsingWallet] = React.useState(false)
    const [differentialAmount, setDifferentialAmount] = React.useState(state.totalPrice)

    const paymentMethodChange = (ev, value) => {
        setPaymentMethod(value);
        if(value === "cash"){
            setSelectedCard('')
        }
    }

    const useWallet = (ev) => {
        if(ev.target.checked){
            setUsingWallet(true)
            let dA = state.totalPrice
            dA = dA - state.wallet
            setDifferentialAmount(dA)
            if(dA <= 0){
                setPaymentMethod('')
                setSelectedCard('')
            }
        }
        else {
            setUsingWallet(false)
            setDifferentialAmount(state.totalPrice)
        }
    }

    const placeOrder = async (ev) => {
        ev.preventDefault();
        let info = {
            usingWallet: usingWallet,
            paymentMethod: paymentMethod,
            card: selectedCard
        }
        try{
            const res1 = await axios.post('https://foodswings.herokuapp.com/consumer/placeOrder', info, {withCredentials: true});
            const res2 = await axios.post('https://foodswings.herokuapp.com/consumer/trackOrder', {id: res1.data.order_ID}, {withCredentials: true})
            navigate('/consumer/trackOrder', {state: {
                order_ID: res1.data.order_ID,
                status: res2.data.status,
                vendor: res2.data.vendor,
                value: res2.data.value,
                payment_method: res2.data.payment_method,
                placedTime: res2.data.placedTime,
                ordered_items: res2.data.ordered_items
            }})
        } catch (err) {
            if(err.response)
                setErrMsg(err.response.statusText)
        }
    }
     
    return ( 
        <div> 
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Checkout</h2>
            <div className="card ms-4 my-4" style={{"width": "25rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Address:</h5>
                    <h6 className="card-subtitle my-2 text-muted"><p className="card-text">{`Building ${state.building_num}, Street ${state.street_num}`}</p>
                    <p className="card-text">{`${state.area}, ${state.city}`}</p></h6>
                    <br />
                    <h5 className="card-title">Phone #:</h5>
                    <p className="card-subtitle my-2 text-muted">{state.phone_num}</p>
                </div>
            </div>
            <p className="lead m-4 fw-bold"> Order value: <span className="lead ms-2">{`Rs. ${state.totalPrice}`}</span></p>
            <p className="lead ms-4 fw-bold"> Select payment method:</p>
            <div className="form-check ms-4">
                {state.wallet > 0 && <div> 
                    <input className="form-check-input" type="checkbox" id="wallet" onChange={useWallet}></input>
                    <label className="form-check-label" htmlFor="wallet">
                        {`Wallet (Rs. ${state.wallet})`}
                    </label> 
                </div>}
                {(usingWallet && differentialAmount>0) && <h2 className="lead text-danger ms-2">{`Remaining amount = ${state.totalPrice} - ${state.wallet} = ${differentialAmount}`}</h2>}
                {((usingWallet && differentialAmount>0) || (usingWallet===false)) &&  <div>
                    <input className="form-check-input" name="paymentMethod" type="radio" onClick={(ev) => {paymentMethodChange(ev, "cash")}} id="cash"></input>
                    <label className="form-check-label" htmlFor="cash">
                        Cash
                    </label>
                    {state.creditCards.length>0 && <div>
                        <input className="form-check-input" name="paymentMethod" id="credit" type="radio" onClick={(ev) => {paymentMethodChange(ev, "credit")}}></input>
                        <label className="form-check-label" htmlFor="credit">
                            Credit Card
                        </label>
                    </div>} 
                </div>}
            </div>
            <br />
            {paymentMethod==="credit" && <div className="form-check ms-2">
                <p className="lead fw-bold"> Credit Card:</p>
                {state.creditCards.map((card, index) => (
                    <div key={index}>
                        <input key={index} className="form-check-input ms-2" type="radio" onClick={(ev) => {setSelectedCard(card)}} name="paymentOption" id={`card-${index}`}></input>
                        <label className="form-check-label" htmlFor={`card-${index}`}>
                            {`${card.type}, **** ${card.credit_card_num.slice(12,16)}`}
                        </label>
                    </div>
                ))}
            </div>}
            <br />
            <button className="btn btn-lg btn-danger fw-bold rounded-pill border ms-4" style={{
                        "width":"20%"
                    }} onClick={placeOrder}>Place Order</button>
            <h2 className="lead text-danger ms-4 my-3">{errMsg}</h2>
        </div>
    );
}
 
export default Checkout;