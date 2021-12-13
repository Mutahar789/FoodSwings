import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";


const ActiveOrdersConsumer = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const viewOrder = async (ev, id, name, value) => {
        ev.preventDefault();
        try{
            const res = await axios.post(`https://foodswings.herokuapp.com/consumer/trackOrder`, {id: id}, {withCredentials: true});
            navigate('/consumer/trackOrder', {state: { 
                order_ID: id,
                status: res.data.status,
                vendor: res.data.vendor,
                value: res.data.value,
                payment_method: res.data.payment_method,
                placedTime: res.data.placedTime,
                ordered_items: res.data.ordered_items
            }})
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Active orders</h2>
            <Link to={`/consumer/home`}><button className="btn btn-danger fw-bold p-2 m-2 btn-lg"> Back to home </button></Link>
            <hr />
            <div className="container-fluid">
                {state.orders.map((order, index) => (
                    <div key={index} className="row my-5 text-center" style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
                        <div className="card" style={{"width": "50rem", "height":"17rem"}}>
                            <div className="card-body">
                                <h5 className="card-title text-white bg-dark p-2">Order #{order.id}</h5>
                                <h5 className="card-title text-white bg-secondary p-2">{order.name}</h5>
                                <hr />
                                <p className="card-text"><span className="fw-bold"> Placed:</span> {`${order.placed.split("T")[0]} ${order.placed.split("T")[1].split(".")[0]}`}</p>
                                <br />
                                <button className="btn btn-primary" style={{"width":"40%"}} onClick={(ev) => viewOrder(ev, order.id, order.name, order.value)}> Track order </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
 
export default ActiveOrdersConsumer ;