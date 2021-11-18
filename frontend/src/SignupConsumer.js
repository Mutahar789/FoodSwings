import React from 'react';
const axios = require('axios')

const SignupConsumer = () => {

    const [email, setEmail] = React.useState(``)
    const [Pw, setPw] = React.useState(``)
    const [userType, setUserType] = React.useState(`consumer`)
    const [firstName, setFirstName] = React.useState(``)
    const [middleName, setMiddleName] = React.useState(``)
    const [lastName, setLastName] = React.useState(``)
    const [city, setCity] = React.useState(``)
    const [area, setArea] = React.useState(``)
    const [streetNum, setStreetNum] = React.useState(``)
    const [buildingNum, setBuildingNum] = React.useState(``)
    const [phone, setPhone] = React.useState(``)
    const [gender, setGender] = React.useState(``)
  
    const formSubmit = async (ev) => {
      ev.preventDefault()
      if(gender){
        const info = {
            type : 'SignUp',
            userType: userType,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email : email,
            password : Pw,
            city: city,
            area: area,
            streetNum: streetNum,
            buildingNum: buildingNum,
            phoneNum: phone,
            gender: gender
        }
        axios.post('http://localhost:8000/signup', info)
        setEmail('')
        setPw('')
        setUserType('')
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setCity('')
        setArea('')
        setStreetNum('')
        setBuildingNum('')
        setPhone('')
        setGender('')
      }
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
    const firstNameChange = (ev) => {
      setFirstName(ev.target.value)
    }
    const middleNameChange = (ev) => {
      setMiddleName(ev.target.value)
    }
    const lastNameChange = (ev) => {
      setLastName(ev.target.value)
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
    const phoneChange = (ev) => {
      setPhone(ev.target.value)
    }
    const genderChange = (ev) => {
      setGender(ev.target.value)
    }
  
    return (  
      <div>
        <h1 style={{
          backgroundColor:"slategray"
        }}>Consumer sign Up</h1>
        <form onSubmit={formSubmit}>
        <label htmlFor="userType"> Select your user type: </label>
            <select name="userType" id="userType" onChange={userTypeChange} required>
                <option value="consumer">Consumer</option>
                <option value="vendor">Vendor</option>
                <option value="rider">Rider</option>
            </select>
  
          <h4> First name: </h4>
          <input type="text" value={firstName} onChange={firstNameChange} required/>
          <h4> Middle name: </h4>
          <input type="text" value={middleName} onChange={middleNameChange} required/>
          <h4> Last name: </h4>
          <input type="text" value={lastName} onChange={lastNameChange} required/>
  
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
          
          <h4>Phone:</h4>
          <input type="text" value={phone} onChange={phoneChange} required/>
  
          <h4>Select your gender:</h4>
          <input type="radio" name="gender" value="Male" onChange={genderChange}/>Male<br/>
          <input type="radio" name="gender" value="Female" onChange={genderChange}/>Female<br/>
          <input type="radio" name="gender" value="Other" onChange={genderChange}/>Other<br/>
  
          <h4></h4>
          <input type="submit" value="Sign up"/>
        </form>
      </div>
    );
  }

export default SignupConsumer;
  