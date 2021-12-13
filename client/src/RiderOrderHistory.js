import { useLocation, Link } from "react-router-dom";


const RiderOrderHistory = () => {
    const {state} = useLocation();

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Order history</h2>
            <Link to="/rider/home"><button className="btn btn-danger fw-bold p-2 m-2 btn-lg"> Back to home </button></Link>
            <hr />
            <div className="container-fluid">
                {state.orders.map((order, index) => (
                    <div key={index} className="row my-3 text-center" style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
                        <div className="card" style={{"width": "50rem", "height":"18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title text-white bg-secondary p-2">{`Order #${order.id}`}</h5>
                                <h5 className="card-title text-white bg-dark p-2">{`${order.vendor_name} `} <i className="bi bi-arrow-right"></i>{` ${order.consumer_name}`}</h5>
                                <hr />
                                <h6 className="card-subtitle mb-2 text-muted">Rs. {order.value}</h6>
                                {order.rating && <p className="card-text"><i className="bi bi-star-fill"></i> {order.rating}</p>}
                                <p className="card-text"><span className="fw-bold"> Placed:</span> {`${order.placed.split("T")[0]} ${order.placed.split("T")[1].split(".")[0]}`}</p>
                                <p className="card-text"><span className="fw-bold">{order.status}</span> {order.delivered && <span>: {`${order.delivered.split("T")[0]} ${order.delivered.split("T")[1].split(".")[0]}`}</span>}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
 
export default RiderOrderHistory ;