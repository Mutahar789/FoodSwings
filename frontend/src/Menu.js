import { useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const Menu = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [errMsg, setErrMsg] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState('');
    const [recent, setRecent] = React.useState((-1, ""));

    const addToCart = async (ev, id, name) => {
        ev.preventDefault();
        try{
            const res = await axios.post('http://localhost:3001/addToCart', {id: id, name: name}, {withCredentials: true});
            setRecent((id, name))
            console.log(recent)
            if(res.data.err) {
                setSuccessMsg('')
                setErrMsg(res.data.err)
                setTimeout(() => {
                    setErrMsg('')
                    setRecent((-1, ""))
                }, 1750)
            } else {
                setErrMsg('')
                setSuccessMsg("Item added to cart!")
                setTimeout(() => {
                    setSuccessMsg('')
                    setRecent((-1, ""))
                }, 1750)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const goToShoppingCart = async (ev) => {
        ev.preventDefault();
        try{
            const res = await axios.get('http://localhost:3001/shoppingCart', {withCredentials: true});
            if(res.data.err){
                setErrMsg(res.data.err)
            } 
            if(res.data.items) {
                const items = res.data.items
                let total_price = 0
                items.map((element) => {
                    total_price += element
                })
                navigate('/cart', {state: { 
                    total_price: total_price,
                    items: items
                }})
            }
        }
        catch (err) {
            console.log(err);
        }
    } 

    return (  
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Menu page</h2>
            <button className="btn btn-primary fw-bold p-2 m-2 btn-lg" onClick={goToShoppingCart}>Shopping Cart</button>
            <h2 className="display-6 text-secondary fw-bold m-2 align-center">{state.vendorName}</h2>
            <img className="rounded mx-2" src="https://image.freepik.com/free-photo/arrangement-with-tasty-food-view_23-2148941549.jpg" alt="restaurantImg"/>
            <br /> <br />
            <h2 className="display-6 text-primary ms-2">Menu</h2>
            <hr />
            <br />
            <div>
                {state.menu.map((item, index) => (
                    <div key={index}>
                        <div className="m-2 p-2 card" style={{"width": "18rem"}}>
                            <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="restaurantImg"/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">Rs. {item.price}</p>
                                {!item.description&& <br />}
                                <button className="btn btn-primary" onClick={(ev) => addToCart(ev, item.id, item.name)}> Add to cart </button>
                            </div>
                        </div>
                        {recent===(item.id, item.name) && <p className="lead text-danger ms-2">{errMsg}</p>}
                        {recent===(item.id, item.name) && <p className="lead text-success ms-2">{successMsg}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Menu;
