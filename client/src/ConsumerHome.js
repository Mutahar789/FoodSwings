import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

const ConsumerHome = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = React.useState('')

    const viewOrderHistory = async (ev) => {
        ev.preventDefault();
        try{
            const res = await axios.get('https://foodswings.herokuapp.com/consumer/orderHistory', {withCredentials: true});
            if (res.data.orders.length === 0){
                setErrMsg("No past orders.")
            }
            else {
                navigate('/orderHistory', {state: {
                    orders: res.data.orders,
                    userType: 'consumer'
                }})
            }
        }
        catch (err) {
            if(err.response){
                setErrMsg(err.response.statusText)
            }
        }
    }
    const viewActiveOrders = async (ev) => {
        ev.preventDefault();
        try{
            const res = await axios.get('https://foodswings.herokuapp.com/consumer/activeOrders', {withCredentials: true});
            if (res.data.orders.length === 0){
                setErrMsg("No active orders.")
            }
            else {
                navigate('/consumer/activeOrders', {state: {
                    orders: res.data.orders,
                }})
            }
        }
        catch (err) {
            if(err.response){
                setErrMsg(err.response.statusText)
            }
        }
    }

    const logout = async (ev) => {
        ev.preventDefault()
        await axios.get('https://foodswings.herokuapp.com/logout', {withCredentials: true});
        navigate("/")
    }

    return (  
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Consumer Home page</h2>
            <button className="btn btn-md btn-secondary" style={{"position":"absolute", "right":"16px", "top":"20px"}} onClick={logout}>Logout</button>
            <br />
            <div className="text-center" style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
                <div className="ms-2 me-2" style={{"width":"50rem"}}>
                    <div className="card" >
                        <h5 className="card-header">Browse restaurants</h5>
                        <div className="card-body">
                            <p className="card-text">Get your food delivered to you right at your doorstep!</p>
                            <Link to="/consumer/browse"><button className="btn btn-lg btn-danger">Order now</button></Link>
                        </div>
                    </div>
                    <br />
                    <div className="card" >
                        <h5 className="card-header">Active orders</h5>
                        <div className="card-body">
                            <p className="card-text">See updates and details of your currently active orders.</p>
                            <button className="btn btn-lg btn-danger" onClick={viewActiveOrders} >Active orders</button>
                        </div>
                    </div>
                    <br />
                    <div className="card" >
                        <h5 className="card-header">Order History</h5>
                        <div className="card-body">
                            <p className="card-text">View details of past orders.</p>
                            <button className="btn btn-lg btn-danger" onClick={viewOrderHistory}>View order history</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h2 className="lead text-danger ms-2 text-center">{errMsg}</h2>
        </div>
    );
}
 
export default ConsumerHome;