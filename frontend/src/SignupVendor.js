import React from 'react';
const axios = require('axios');

const SignupVendor = () => {

    const [email, setEmail] = React.useState(``)
    const [Pw, setPw] = React.useState(``)
    const [userType, setUserType] = React.useState(`vendor`)
    const [name, setName] = React.useState(``)
    const [city, setCity] = React.useState(``)
    const [area, setArea] = React.useState(``)
    const [streetNum, setStreetNum] = React.useState(``)
    const [buildingNum, setBuildingNum] = React.useState(``)
    const [bankAcc, setBankAcc] = React.useState(``)
  
    const formSubmit = async (ev) => {
      ev.preventDefault()
      const info = {
          type : 'SignUp',
          name: name,
          userType: userType,
          email : email,
          password : Pw,
          city: city,
          area: area,
          streetNum: streetNum,
          buildingNum: buildingNum,
          bankAcc: bankAcc
      }
      axios.post('http://localhost:8000/signup', info)
      setEmail('')
      setPw('')
      setUserType('')
      setName('')
      setCity('')
      setArea('')
      setStreetNum('')
      setBuildingNum('')
      setBankAcc('')
    }
  
    const emailChange = (ev) => {
        setEmail(ev.target.value)
    }
    const passwordChange = (ev) => {
        setPw(ev.target.value)
    }
    const userTypeChange = (ev) => {
      setUserType(ev.target.value)
    }
    const nameChange = (ev) => {
      setName(ev.target.value)
    }
    const cityChange = (ev) => {
      setCity(ev.target.value)
    }
    const areaChange = (ev) => {
      setArea(ev.target.value)
    }
    const streetChange = (ev) => {
      setStreetNum(ev.target.value)
    }
    const buildingChange = (ev) => {
      setBuildingNum(ev.target.value)
    }
    const bankChange= (ev) => {
      setBankAcc(ev.target.value)
    }
  
    return (  
      <div>
        <h1>Vendor sign Up</h1>
        <form onSubmit={formSubmit}>
        <label htmlFor="userType"> Select your user type: </label>
            <select name="userType" id="userType" onChange={userTypeChange} required>
                <option value="vendor">Vendor</option>
                <option value="consumer">Consumer</option>
                <option value="rider">Rider</option>
            </select>
          <h4> Name: </h4>
          <input type="text" value={name} onChange={nameChange} required/>
  
          <h4>Email:</h4>
          <input type="Email" value={email} onChange={emailChange} required/>
  
          <h4>Password:</h4>
          <input type="password" value={Pw} onChange={passwordChange} required/>
  
          <h4>City:</h4>
          <input type="text" value={city} onChange={cityChange} required/>
  
          <h4>Area:</h4>
          <input type="text" value={area} onChange={areaChange} required/>
  
          <h4>Street No.:</h4>
          <input type="text" value={streetNum} onChange={streetChange} required/>
  
          <h4>Building No.:</h4>
          <input type="text" value={buildingNum} onChange={buildingChange} required/>
          
          <h4>Bank account:</h4>
          <input type="text" value={bankAcc} onChange={bankChange} required/>
  
          <h4></h4>
          <input type="submit" value="Sign up"/>
        </form>
      </div>
    );
  }

export default SignupVendor;