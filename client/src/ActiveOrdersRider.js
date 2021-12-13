import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import React from "react";

const ActiveOrdersRider = () => {
    const {state} = useLocation();
    const [orders, setOrders] = React.useState(state.orders)

    const updateStatus = async (ev, id) => {
        ev.preventDefault();
        try{
            await axios.post(`https://foodswings.herokuapp.com/rider/updateStatus`, {id: id}, {withCredentials: true});
            const res = await axios.get('https://foodswings.herokuapp.com/rider/activeOrders', {withCredentials: true});
            setOrders(res.data.orders)
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Active orders</h2>
            <Link to={`/rider/home`}><button className="btn btn-danger fw-bold p-2 m-2 btn-lg"> Back to home </button></Link>
            <hr />
            <div className="container-fluid">
                {orders.map((order, index) => (
                    <div key={index} className="row my-5 text-center" style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
                        <div className="card" style={{"width": "50rem", "height":"17rem"}}>
                            <div className="card-body">
                                <h5 className="card-title text-white bg-dark p-2">Order #{order.id}</h5>
                                <h5 className="card-title text-white bg-secondary p-2">{`${order.vendor_name} `} <i className="bi bi-arrow-right"></i>{` ${order.consumer_name}`}</h5>
                                <hr />
                                <p className="card-text"><span className="fw-bold"> Value:</span> Rs. {order.value}</p>
                                <p className="card-text"><span className="fw-bold"> Placed:</span> {`${order.placed.split("T")[0]} ${order.placed.split("T")[1].split(".")[0]}`}</p>
                                {order.status==="Ready" && <button className="btn btn-md btn-primary" onClick={(ev) => updateStatus(ev, order.id, index)}>Mark Picked up</button>} 
                                {order.status==="Picked up"  && <button className="btn btn-md btn-primary" onClick={(ev) => updateStatus(ev, order.id)}>Mark delivered</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
 
export default ActiveOrdersRider ;