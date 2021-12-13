import React from "react";
import { useNavigate } from "react-router";
const axios = require('axios')

const Signup = () => {
    const navigate = useNavigate();
    const cityList = ['Islamabad', 'Lahore', 'Karachi', 'Faisalabad', 'Peshawar', 'Quetta']
    const [areaList, setAreaList] = React.useState([])
    const vehicleTypesList = ['Car', 'Motorcycle', 'Bicycle', 'Rickshaw']

    // name
    const [name, setName] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [middleName, setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')

    // address
    const [city, setCity] = React.useState('')
    const [area, setArea] = React.useState('')
    const [street, setStreet] = React.useState('')
    const [building, setBuilding] = React.useState('')

    // login credentials
    const [email, setEmail] = React.useState('')
    const [pw, setPw] = React.useState('')

    const [userType, setUserType] = React.useState('consumer')
    const [bankAcc, setBankAcc] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [vehicleType, setVehicleType] = React.useState('')
    const [vehicleReg, setVehicleReg] = React.useState('')

    // multi-valued
    const [deliveryLoc, setDeliveryLoc] = React.useState([''])
    const [numDeliveryLoc, setNumDeliveryLoc] = React.useState(1)

    const [phone, setPhone] = React.useState('')
    const [phoneList, setPhoneList] = React.useState([''])
    const [numPhone, setNumPhone] = React.useState(1)

    const [creditCards, setCreditCards] = React.useState([])
    const [cvcList, setCVCList] = React.useState([])
    const [expMonth, setExpMonth] = React.useState([])
    const [expYear, setExpYear] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [numCreditCards, setNumCreditCards] = React.useState(0)

    const [errMsg, setErrMsg] = React.useState('')

    // name
    const nameChange = (ev) => {
        setName(ev.target.value)
    }
    const firstNameChange = (ev) => {
        setFirstName(ev.target.value)
    }
    const middleNameChange = (ev) => {
        setMiddleName(ev.target.value)
    }
    const lastNameChange = (ev) => {
        setLastName(ev.target.value)
    }
    // login credentials
    const emailChange = (ev) => {
        setEmail(ev.target.value)
    }
    const passwordChange = (ev) => {
        setPw(ev.target.value)
    }
    // address
    const cityChange = async (ev) => {
        if(ev.target.value){
            setCity(ev.target.value)
            try{
                const res = await axios.post('https://foodswings.herokuapp.com/getAreas', {city: ev.target.value}, {withCredentials: true});
                if(res.data.areaList) {

                    setAreaList(res.data.areaList)
                }
            } catch (err) {
                console.log(err);
            }
        }
        else
            setCity('')
    }
    const areaChange = (ev) => {
        setArea(ev.target.value)
    }
    const streetChange = (ev) => {
        setStreet(ev.target.value)
    }
    const buildingChange = (ev) => {
        setBuilding(ev.target.value)
    }
    
    const userTypeChange = (ev, v) => {
        ev.preventDefault()
        setUserType(v)
    }
    const bankAccChange= (ev) => {
        setBankAcc(ev.target.value)
    }
    const genderChange = (ev) => {
        setGender(ev.target.value)
    }
    const vehicleRegChange = (ev) => {
        setVehicleReg(ev.target.value)
    }
    const vehicleTypeChange = (ev) => {
        setVehicleType(ev.target.value)
    }
    const phoneChange = (ev) => {
        setPhone(ev.target.value)
    }
    const phoneListChange = (ev, index) => {
        let pL = phoneList
        pL[index] = ev.target.value
        setPhoneList(pL)
    }
    const increasePhones = (ev) => {
        ev.preventDefault();
        setNumPhone(numPhone+1)
        setPhoneList([...phoneList, ""])
    } 
    const decreasePhones = (ev) => {
        ev.preventDefault();
        setNumPhone(numPhone-1)
        let pL = phoneList;
        pL.pop()
        setPhoneList(pL)
    } 
    const deliveryLocChange = (ev, index) => {
        let dL = deliveryLoc
        dL[index] = ev.target.value
        setDeliveryLoc(dL)
    }
    const expandRadius = (ev) => {
        ev.preventDefault();
        setNumDeliveryLoc(numDeliveryLoc+1)
        setDeliveryLoc([...deliveryLoc, ""])
    } 
    const shrinkRadius = (ev) => {
        ev.preventDefault();
        setNumDeliveryLoc(numDeliveryLoc-1)
        let dL = deliveryLoc;
        dL.pop()
        setDeliveryLoc(dL)
    } 
    const creditCardsChange = (ev, index) => {
        let cards = creditCards
        cards[index] = ev.target.value
        setDeliveryLoc(cards)
    }
    const cvcChange = (ev, index) => {
        let cL = cvcList
        cL[index] = ev.target.value
        setCVCList(cL)
    }
    const expMonthChange = (ev, index) => {
        let eM = expMonth
        eM[index] = ev.target.value
        setExpMonth(eM)
    }
    const expYearChange = (ev, index) => {
        let eY = expYear
        eY[index] = ev.target.value
        setExpYear(eY)
    }
    const typeChange = (ev, index) => {
        let t = types
        t[index] = ev.target.value
        setTypes(t)
    }
    const increaseCards = (ev) => {
        ev.preventDefault();
        setNumCreditCards(numCreditCards+1)
        setCreditCards([...creditCards, ""])
        setCVCList([...cvcList, ""])
        setExpMonth([...expMonth, ""])
        setExpYear([...expYear, ""])
        setTypes([...types, "Visa"])
    }
    const decreaseCards = (ev) => {
        ev.preventDefault();
        setNumCreditCards(numCreditCards-1)
        let cards = creditCards
        let cL = cvcList
        let eM = expMonth
        let eY = expYear
        let t = types
        cL.pop()
        cards.pop()
        eM.pop()
        eY.pop()
        t.pop()
        setCVCList(cL)
        setCreditCards(cards)
        setExpMonth(eM)
        setExpYear(eY)
        setTypes(t)
    }

    const formSubmit = async (ev) => {
        ev.preventDefault();
        const info = {
            userType: userType,
            city: city, 
            area: area, 
            street: street, 
            building: building,
            email: email,
            password: pw
        }
        if(userType === "vendor"){
            info["bankAcc"] = bankAcc
            info["name"] = name
            info["phone"] = phoneList
            info["deliveryLoc"] = deliveryLoc
        }
        if(userType === "consumer"){
            info["firstName"] = firstName
            info["middleName"] = middleName
            info["lastName"] = lastName
            info["phone"] = phone
            info["gender"] = gender
            info["credit_cards"] = creditCards
            info["CVCs"] = cvcList
            info["expMonths"] = expMonth
            info["expYears"] = expYear
            info["types"] = types
        }
        if(userType === "rider"){
            info["firstName"] = firstName
            info["middleName"] = middleName
            info["lastName"] = lastName
            info["phone"] = phone
            info["gender"] = gender
            info["bankAcc"] = bankAcc
            info["vehicleType"] = vehicleType
            info["vehicleReg"] = vehicleReg
        }
        try{
            await axios.post('https://foodswings.herokuapp.com/signup', info, {withCredentials: true});
            navigate(`/${userType}/Home`)
        }
        catch (err) {
            if(err.response)
                setErrMsg(err.response.data)
        }
    }

    return ( 
        <div>
            <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Signup page</h2>
            <p className="lead ms-2"> Select your user type:</p>
            <div className="btn-group ms-2 mb-2" required>
                <button className="btn btn-primary" onClick={(ev) => userTypeChange(ev, "vendor")}>Vendor</button>
                <button className="btn btn-warning" onClick={(ev) => userTypeChange(ev, "consumer")}>Consumer</button>
                <button className="btn btn-success" onClick={(ev) => userTypeChange(ev, "rider")}>Rider</button>
            </div>
            <form className="m-2" onSubmit={formSubmit}>
                <h4 className="lead fw-bold">Name:</h4>
                {userType==="vendor" && <input type="text" value={name} onChange={nameChange} placeholder="Your name" required/>}
                {userType !== "vendor" && <div className="my-2">
                    <input type="text" className="me-2" value={firstName} onChange={firstNameChange} placeholder="First name" required/>
                    <input type="text" className="me-2" value={middleName} onChange={middleNameChange} placeholder="Middle name"/>
                    <input type="text" className="me-2" value={lastName} onChange={lastNameChange} placeholder="Last name" required/>
                </div>}
                <h4 className="lead fw-bold mt-3">Address:</h4>
                <select className="form-select my-2"  style={{
                    "width":"15%"
                }} required onChange={cityChange}>
                    <option value="">Select city</option>
                    {cityList.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
                {city && <div className="my-2"> <select className="form-select" style={{
                    "width":"15%"
                }} required onChange={areaChange}>
                    <option value>Select area</option>
                    {areaList.map((element, index) => (
                        <option key={index} value={element["area"]}>{element["area"]}</option>
                    ))}
                </select></div>}
                <input type="number" className="my-1" value={street} onChange={streetChange} placeholder="Street No." required/>
                <br />
                <input type="number"  className="my-1" value={building} onChange={buildingChange} placeholder="Building No." required/>

                <h4 className="lead fw-bold mt-3">Email:</h4>
                <input type="Email" value={email} onChange={emailChange} placeholder="email@id.com" required/>
                <h4 className="lead fw-bold my-2">Password:</h4>
                <input type="Password" value={pw} onChange={passwordChange} placeholder="your password..." required/>
                {(userType!=="consumer") && <div>
                <h4 className="lead fw-bold mt-3">24-digit IBAN #:</h4>
                <input type="text"  className="my-1" minLength="24" maxLength="24" value={bankAcc} onChange={bankAccChange} placeholder="PK86UBIL1234567891234567" required/>
                </div>}
                {(userType!== "vendor") && <div>
                <h4 className="lead fw-bold mt-3">Gender:</h4>
                <input type="radio" name="gender" value="Male" onChange={genderChange}/>Male<br/>
                <input type="radio" name="gender" value="Female" onChange={genderChange}/>Female<br/>
                <input type="radio" name="gender" value="Other" onChange={genderChange}/>Other<br/>
                <h4 className="lead fw-bold mt-3">Phone #:</h4>
                <input type="text" value={phone} minLength="11" maxLength="11" placeholder="03XXXXXXXXX" onChange={phoneChange} required />
                </div>}
                {userType==="rider" && <div>
                    <h4 className="lead fw-bold mt-3">Vehicle details:</h4>
                    <select className="form-select my-2"  style={{
                        "width":"15%"
                    }} required onChange={vehicleTypeChange}>
                        <option value="">Select vehicle type</option>
                        {vehicleTypesList.map((element, index) => (
                            <option key={index} value={element}>{element}</option>
                        ))}
                    </select>
                    <input type="text" value={vehicleReg} minLength="7" maxLength="7" onChange={vehicleRegChange} placeholder="Reg No. e.g LE-1234" required/>
                </div> }

                {userType==="vendor" && <div>
                    <h4 className="lead fw-bold mt-3">Phone #:</h4>
                    {phoneList.map((phoneNum, index) => (
                        <div key={index} className="my-2">
                            <input type="text" minLength="11" maxLength="11" placeholder="03XXXXXXXXX" onChange={(ev) => {phoneListChange(ev, index)}} required/>
                        </div>
                    ))}
                    <i className="bi bi-plus-circle-fill" style={{"color":"blue"}} onClick={increasePhones}> </i>
                    {numPhone>1 && <i className="bi bi-dash-circle-fill" style={{"color":"red"}} onClick={decreasePhones}></i>}
                </div> }
                {(userType==="vendor" && city) && <div>
                    <h4 className="lead fw-bold mt-3">Delivery radius:</h4>
                    {deliveryLoc.map((loc, index) => (
                        <div key={index} className="my-2">
                            <div className="my-2"> <select className="form-select" style={{
                                "width":"15%"
                            }} required onChange={(ev) => {deliveryLocChange(ev, index)}}>
                                <option value="">Select area</option>
                                {areaList.map((element, index) => (
                                    <option key={index} value={element["area"]}>{element["area"]}</option>
                                ))}
                            </select></div>
                        </div>
                    ))}
                    <i className="bi bi-plus-circle-fill" style={{"color":"blue"}} onClick={expandRadius}> </i>
                    {numDeliveryLoc>1 && <i className="bi bi-dash-circle-fill" style={{"color":"red"}} onClick={shrinkRadius}></i>}
                </div> }
                {(userType==="consumer") && <div>
                    <h4 className="lead fw-bold mt-3">Credit Cards:</h4>
                    {creditCards.map((loc, index) => (
                        <div key={index} className="my-2 ms-3">
                            <h4 className="lead fw-bold mt-2">Card #{index+1}:</h4>
                            <select className="form-select" style={{
                                "width":"15%"
                            }} required onChange={(ev) => {typeChange(ev, index)}}>
                                <option value="Visa">Visa</option>
                                <option value="Master">Master</option>
                            </select>
                            <input type="text" minLength="16" maxLength="16" className="me-2 mt-2" placeholder="16-digit card no." onChange={(ev) => {creditCardsChange(ev, index)}} required/>
                            <input type="text" minLength="3" maxLength="3" placeholder="3-digit CVC" onChange={(ev) => {cvcChange(ev, index)}} required/>
                            <br />
                            <input type="number" min="1" max="12" className="me-2 mt-2" placeholder="EXP Month" style={{"width":"9%"}} onChange={(ev) => {expMonthChange(ev, index)}} required/>
                            <input type="number" min="2022" max="2029" placeholder="EXP Year" style={{"width":"9%"}} onChange={(ev) => {expYearChange(ev, index)}} required/>
                        </div>
                    ))}
                    <i className="bi bi-plus-circle-fill" style={{"color":"blue"}} onClick={increaseCards}> </i>
                    {numCreditCards>0 && <i className="bi bi-dash-circle-fill" style={{"color":"red"}} onClick={decreaseCards}></i>}
                </div> }
                <br />
                <input type="submit" className="btn btn-md btn-danger" value="Signup"/>
            </form>
            <br />
            <h2 className="lead text-danger ms-2">{errMsg}</h2>
        </div>
     );
}

export default Signup;