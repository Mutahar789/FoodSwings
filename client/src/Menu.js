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
            await axios.post('https://foodswings.herokuapp.com/consumer/addToCart', {id: id, name: name}, {withCredentials: true});
            setRecent((id, name))
            setSuccessMsg("Item added to cart!")
            setTimeout(() => {
                setSuccessMsg('')
                setRecent((-1, ""))
            }, 1600)
        } catch (err) {
            console.log(err)
        }
    }

    const goToShoppingCart = async (ev) => {
        ev.preventDefault();
        try{
            const res = await axios.get('https://foodswings.herokuapp.com/consumer/cart', {withCredentials: true});
            const items = res.data.items
            let total_price = 0
            items.forEach((element) => {
                total_price += element.price*element.qty
            })
            navigate('/consumer/cart', {state: { 
                total_price: total_price,
                items: items
            }})
        }
        catch (err) {
            if(err.response){
                setErrMsg(err.response.statusText)
                if(err.response.data.err){
                    setErrMsg(err.response.data.err)
                }
            }
        }
    } 

    return (  
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Menu page</h2>
            <button className="btn btn-primary fw-bold p-2 m-2 btn-lg" onClick={goToShoppingCart}>Shopping Cart</button>
            <h2 className="lead text-danger ms-2">{errMsg}</h2> 
            <h2 className="display-6 text-secondary fw-bold m-2 align-center">{state.vendorName}</h2>
            <img className="rounded mx-2" src={state.vendorImg} alt="restaurantImg" style={{"width":"800px", "height":"auto"}}/>
            <br /> <br />
            <h2 className="display-6 text-primary ms-2 text-center fw-bold">Menu</h2>
            <hr />
            <br />
            {state.categories.map((category, index) => (
                <div key={index}>
                    <h2 className="display-6 text-primary ms-2">{category}</h2>
                    <br />
                    <div style={{"display":"grid", "gridTemplateColumns":"340px 340px 340px 340px"}}>
                        {state.menu[category].map((item, idx) => (
                            <div key={idx}>
                                <div className="m-2 p-2 card" style={{"width": "19rem", "height":"32rem"}}>
                                    {item.image_url && <img src={item.image_url} alt="restaurantImg" style={{"height":"14rem"}}/>}
                                    {!item.image_url && <img src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg" alt="restaurantImg" style={{"height":"14rem"}}/>}
                                    <div className="card-body">
                                        <h5 className="card-title" style={{"height":"3rem"}}>{item.name}</h5>
                                        <p className="card-text" style={{"height":"6rem"}}>{item.description}</p>
                                        <p className="card-text">Rs. {item.price}</p>
                                        <button className="btn btn-primary" onClick={(ev) => addToCart(ev, item.id, item.name)}> Add to cart </button>
                                    </div>
                                </div>
                                {recent===(item.id, item.name) && <p className="lead text-success ms-2">{successMsg}</p>}
                            </div>
                        ))}
                    </div>
                    <br />
                </div>
            ))}
        </div>
    );
}
 
export default Menu;
