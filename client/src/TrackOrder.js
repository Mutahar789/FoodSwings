import { useLocation, Link, useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";

const TrackOrder = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [pageData, setPageData] = React.useState(state)

    const refresh = async (ev) => {
        try{
            const res = await axios.post('https://foodswings.herokuapp.com/consumer/trackOrder', {id: pageData.order_ID}, {withCredentials: true})
            setPageData(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const cancel = async  (ev) => {
        try{
            const res = await axios.post('https://foodswings.herokuapp.com/consumer/cancelOrder', {id: pageData.order_ID}, {withCredentials: true})
            if(res.data.success){
                navigate("/consumer/home")
            } else {
                const res = await axios.post('https://foodswings.herokuapp.com/consumer/trackOrder', {id: pageData.order_ID}, {withCredentials: true})
                setPageData(res.data)
            }
        } catch(err) {
            console.log(err)
        }
    }
    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Track order</h2>
            <Link to={`/consumer/home`}><button className="btn btn-danger fw-bold p-2 m-2 btn-lg"> Back to home </button></Link>
            <button className="btn btn-primary fw-bold p-2 m-2 btn-lg" onClick={refresh}> Refresh </button>
            <hr />
            <div className="container-fluid">
                <div className="row my-3 text-center" style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
                    <div className="card" style={{"width": "50rem", "height":"23rem"}}>
                        <div className="card-body">
                            <h5 className="card-title text-white bg-dark p-2">Order# {pageData.order_ID}</h5>
                            <h5 className="card-title text-white bg-secondary p-2">Vendor: {pageData.vendor}</h5>
                            <hr />
                            <p className="card-text mb-3"><span className="fw-bold mb-2"> Value: </span> Rs. {pageData.value}</p>
                            <p className="card-text"><span className="fw-bold mb-2"> Items: </span> {pageData.ordered_items.map((item, index) => <span key={index}>{item.name}, </span> )}</p>
                            <p className="card-text"><span className="fw-bold mb-2"> Status:</span> {pageData.status}</p>
                            <p className="card-text"><span className="fw-bold mb-2"> Placed:</span> {`${pageData.placedTime.split("T")[0]} ${state.placedTime.split("T")[1].split(".")[0]}`}</p>
                            {pageData.status ==="Placed" && <button className="btn btn-md btn-primary" onClick={cancel}>Cancel order</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default TrackOrder;