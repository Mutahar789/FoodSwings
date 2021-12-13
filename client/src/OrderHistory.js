import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";


const OrderHistory = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const viewOrder = async (ev, id, name, value) => {
        ev.preventDefault();
        try{
            const res = await axios.post(`https://foodswings.herokuapp.com/${state.userType}/orderDetails`, {id: id}, {withCredentials: true});
            navigate('/viewOrder', {state: { 
                orderID: id,
                name: name,
                items: res.data.items,
                value: value
            }})
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Order history</h2>
            <Link to={`/${state.userType}/home`}><button className="btn btn-danger fw-bold p-2 m-2 btn-lg"> Back to home </button></Link>
            <hr />
            <div className="container-fluid">
                {state.orders.map((order, index) => (
                    <div key={index} className="row my-3 text-center" style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
                        <div className="card" style={{"width": "50rem", "height":"18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title text-white bg-dark p-2">{order.name}</h5>
                                <hr />
                                <h6 className="card-subtitle mb-2 text-muted">Rs. {order.value}</h6>
                                {order.rating && <p className="card-text"><i className="bi bi-star-fill"></i> {order.rating}</p>}
                                <p className="card-text"><span className="fw-bold"> Placed:</span> {`${order.placed.split("T")[0]} ${order.placed.split("T")[1].split(".")[0]}`}</p>
                                <p className="card-text"><span className="fw-bold">{order.status}</span> {order.delivered && <span>: {`${order.delivered.split("T")[0]} ${order.delivered.split("T")[1].split(".")[0]}`}</span>}</p>
                                <button className="btn btn-primary" style={{"width":"40%"}} onClick={(ev) => viewOrder(ev, order.id, order.name, order.value)}> View details </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
 
export default OrderHistory ;