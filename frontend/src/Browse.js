import React from 'react'
import { useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
const axios = require('axios')

function Browse() {
    const navigate = useNavigate()
    const [restaurantList, setRestaurantList] = React.useState([])
    const [errMsg, setErrMsg] = React.useState('')
    
    const find = async (ev) => {
        ev.preventDefault()
        try{
            const res = await axios.get('http://localhost:3001/browseVendors', {withCredentials: true});
            if(res.data.err){
                setErrMsg(res.data.err)
                setRestaurantList([])
            } 
            if(res.data.vendors) {
                setRestaurantList(res.data.vendors)
            }
        }
        catch (err) {
            console.log(err);
        }
    } 
    const goToMenu = async (ev, id, name, image_url) => {
        ev.preventDefault();
        try{
            const res = await axios.get('http://localhost:3001/menu', {withCredentials: true});
            if(res.data.err){
                setErrMsg(res.data.err)
            } 
            if(res.data.items) {
                const items = res.data.items
                navigate('/menu', {state: { 
                    vendorID: id,
                    vendorName: name,
                    vendorImg: image_url,
                    menu: items
                }})
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
            console.log("HELLO")
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
        <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Browse page</h2>
       <button className="btn btn-danger fw-bold p-2 m-2 btn-lg" onClick={find}>Find restaurants</button>
       <button className="btn btn-primary fw-bold p-2 m-2 btn-lg" onClick={goToShoppingCart}>Shopping Cart</button>
       <h2 className="display-6 text-danger m-2">{errMsg}</h2>
       <div style={{"display":"grid", "gridTemplateColumns":"325px 325px 325px 325px"}}>
            {restaurantList.map((restaurant, index) => (
                <div key={index} className="m-2 p-2 card" style={{"width": "18rem"}}>
                        <img src="https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-260nw-722718097.jpg" alt="restaurantImg"/>
                        <div className="card-body">
                            <h5 className="card-title">{restaurant.name}</h5>
                            <p className="card-text">{restaurant.rating && <i className="bi bi-star-fill"></i>} {restaurant.rating}</p>
                            {!restaurant.rating&& <br />}
                            <button className="btn btn-primary" onClick={(ev) => {goToMenu(ev, restaurant.id, restaurant.name, restaurant.image_url)}}>Menu</button>
                        </div>
                    </div>
            ))}
       </div>

   </div>
  );
}

export default Browse;
