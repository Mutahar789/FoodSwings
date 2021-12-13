import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

const UpdateMenu = () => {
    const categoryOptions = ['Desi', 'Burger', 'Pizza', 'Pasta', 'Desserts']
    const { state } = useLocation();
    const [categories, setCategories] = React.useState(state.categories)
    const [menu, setMenu] = React.useState(state.menu)
    const [errMsg, setErrMsg] = React.useState('')
    const [successMsg, setSuccessMsg] = React.useState('')
    const [addingItem, setAddingItem] = React.useState(false)

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState(1)
    const [category, setCategory] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [image_url, setImage_url] = React.useState('')

    const nameChange = (ev) => {
        setName(ev.target.value)
    }
    const priceChange = (ev) => {
        setPrice(ev.target.value)
    }
    const categoryChange = (ev) => {
        setCategory(ev.target.value)
    }
    const descriptionChange = (ev) => {
        setDescription(ev.target.value)
    }
    const image_urlChange = (ev) => {
        setImage_url(ev.target.value)
    }

    const removeItem = async (ev, name) => {
        ev.preventDefault()
        try{
            await axios.post('https://foodswings.herokuapp.com/vendor/removeItem', {name: name}, {withCredentials: true});
            const res = await axios.get('https://foodswings.herokuapp.com/vendor/menu', {withCredentials: true});
            setCategories(res.data.categories)
            setMenu(res.data.items)
        } catch(err) {
            if(err.response)
                setErrMsg(err.response.statusText)       
        }
    }

    const openForm = (ev) => {
        ev.preventDefault()
        setAddingItem(true)
    }


    const addItem = async (ev) => {
        ev.preventDefault()
        
        const info = {
            name: name,
            price: price,
            category: category,
            description: description,
            image_url: image_url
        }
        try{
            await axios.post('https://foodswings.herokuapp.com/vendor/addItem', info, {withCredentials: true});
            const res = await axios.get('https://foodswings.herokuapp.com/vendor/menu', {withCredentials: true});
            setMenu(res.data.items)
            setCategories(res.data.categories)
            setErrMsg('')
            setSuccessMsg('Item successfully added')
            setTimeout(() => {
                setSuccessMsg('')
                setAddingItem(false)
            }, 1500)
        } catch(err) {
            if(err.response)
                setErrMsg(err.response.statusText)
        }
    }


    return (
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Update menu page</h2>
            <Link to="/vendor/home"><button className="btn btn-danger fw-bold p-2 m-2 btn-lg"> Back to home </button></Link>
            <h2 className="display-6 text-danger mt-3 text-center fw-bold">Menu</h2>
            <hr />
           {!addingItem && <div>
                <div className="m-2 p-2 card" style={{"width": "19rem", "height":"25rem"}}>
                    <img src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-add-vector-icon-png-image_3791307.jpg" alt="addItem" style={{"height":"14rem"}}/>
                    <div className="card-body">
                        <h5 className="card-title" style={{"height":"2rem"}}>Add item</h5>
                        <p className="card-text" style={{"height":"2rem"}}>Make an additon to your menu</p>
                        <button className="btn btn-primary" onClick={openForm}>Add item</button>
                    </div>
                </div>
            </div>}
            {addingItem && <div className="ms-2"> 
                <h4 className="lead fw-bold mt-2">Item to add:</h4>
                <div className="ms-2">
                    <form onSubmit={addItem}>
                        <select className="form-select mt-2" required onChange={categoryChange} style={{
                                "width":"25%"
                            }}>
                            <option value="">Select category</option>
                            {categoryOptions.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                        ))}
                        </select>
                        <h4 className="lead fw-bold mt-2">Name:</h4>
                        <input type="text" maxLength="30" required onChange={nameChange}/>
                        <h4 className="lead fw-bold mt-2">Price:</h4>
                        <input type="number" min="1" required onChange={priceChange}/>
                        <h4 className="lead fw-bold mt-2">Description:</h4>
                        <input type="text" maxLength="250" onChange={descriptionChange}/>
                        <h4 className="lead fw-bold mt-2">Image URL:</h4>
                        <input type="text" maxLength="255" onChange={image_urlChange}/>
                        <br /><br />
                        <input type="submit" className="btn btn-md btn-primary" value="Add"/>
                        <button className="btn btn-secondary ms-2" onClick={(ev) => {setAddingItem(false)}}> Cancel </button>
                    </form>
                </div>
            </div>}
            <h2 className="lead text-success m-2">{successMsg}</h2> 
            <h2 className="lead text-danger m-2">{errMsg}</h2> 
            {categories.map((category, index) => (
                <div key={index}>
                    <h2 className="display-6 text-primary ms-2">{category}</h2>
                    <br />
                    <div style={{"display":"grid", "gridTemplateColumns":"340px 340px 340px 340px"}}>
                        {menu[category].map((item, idx) => (
                            <div key={idx}>
                                <div className="m-2 p-2 card" style={{"width": "19rem", "height":"32rem"}}>
                                    {item.image_url && <img src={item.image_url} alt="restaurantImg" style={{"height":"14rem"}}/>}
                                    {!item.image_url && <img src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg" alt="restaurantImg" style={{"height":"14rem"}}/>}
                                    <div className="card-body">
                                        <h5 className="card-title" style={{"height":"3rem"}}>{item.name}</h5>
                                        <p className="card-text" style={{"height":"6rem"}}>{item.description}</p>
                                        <p className="card-text">Rs. {item.price}</p>
                                        <button className="btn btn-danger" onClick={(ev) => {removeItem(ev, item.name)}}> Remove item </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                </div>
            ))}
        </div>
    );
}
 
export default UpdateMenu;
