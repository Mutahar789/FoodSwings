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
            const res = await axios.get('https://foodswings.herokuapp.com/consumer/browse', {withCredentials: true});
            setErrMsg('')
            if (res.data.vendors.length === 0){
                setErrMsg("We're sorry. No restaurants currently serving in your area. Try again another time.")
            }
            setRestaurantList(res.data.vendors)
        }
        catch (err) {
            if(err.response){
                setErrMsg(err.response.statusText)
            }
        }
    } 
    
    const goToMenu = async (ev, id, name, image_url) => {
        ev.preventDefault();
        try{
            const res = await axios.post('https://foodswings.herokuapp.com/consumer/menu', {id: id}, {withCredentials: true});
            navigate('/consumer/menu', {state: { 
                vendorID: id,
                vendorName: name,
                vendorImg: image_url,
                menu: res.data.items,
                categories: res.data.categories
            }})
        }
        catch (err) {
            if(err.response){
                setErrMsg(err.response.statusText)
            }
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
        <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Browse page</h2>
       <button className="btn btn-danger fw-bold p-2 m-2 btn-lg" onClick={find}>Find restaurants</button>
       <button className="btn btn-primary fw-bold p-2 m-2 btn-lg" onClick={goToShoppingCart}>Shopping Cart</button>
       <h2 className="lead text-danger ms-2">{errMsg}</h2> 
       <div style={{"display":"grid", "gridTemplateColumns":"325px 325px 325px 325px"}}>
            {restaurantList.map((restaurant, index) => (
                <div key={index} className="m-2 p-2 card" style={{"width": "18rem", "height":"25rem"}}>
                        {restaurant.image_url && <img src={restaurant.image_url} alt="restaurantImg" style={{"height":"14rem"}}/>}
                        {!restaurant.image_url && <img src="https://www.digitalrealm.com.pk/Images/Thumbnails-Large/mood-1204-137979-230118021516.jpg" alt="restaurantImg" style={{"height":"14rem"}}/>}
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
