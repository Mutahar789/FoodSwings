import React from "react";
import { useLocation } from "react-router-dom";

const ViewOrder = () => {
    const {state} = useLocation();
    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Order #{state.orderID}</h2>
            <br />
            <h2 className="display-6 text-danger text-center fw-bold py-1 my-3">{state.name}</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr className="bg-danger text-white fw-bold">
                                    <td>Sr no.</td>
                                    <td>Item</td>
                                    <td>Qty</td>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            <tbody>
                            {state.items.map((element, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{element.name}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.price*element.quantity}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="bg-danger text-white fw-bold">{state.value}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ViewOrder;