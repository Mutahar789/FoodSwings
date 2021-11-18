import React from 'react';
const axios = require('axios')

const SignupRider = () => {

    const [email, setEmail] = React.useState(``)
    const [Pw, setPw] = React.useState(``)
    const [userType, setUserType] = React.useState(`vendor`)
    const [firstName, setFirstName] = React.useState(``)
    const [middleName, setMiddleName] = React.useState(``)
    const [lastName, setLastName] = React.useState(``)
    const [city, setCity] = React.useState(``)
    const [area, setArea] = React.useState(``)
    const [streetNum, setStreetNum] = React.useState(``)
    const [buildingNum, setBuildingNum] = React.useState(``)
    const [vehicleType, setVehicleType] = React.useState(``)
    const [vehicleReg, setVehicleReg] = React.useState(``)
    const [phoneNum, setPhoneNum] = React.useState(``)
    const [gender, setGender] = React.useState(``)
    const [bankAcc, setBankAcc] = React.useState(``)
  
    const formSubmit = async (ev) => {
      ev.preventDefault()
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
          vehicleType: vehicleType,
          vehicleReg: vehicleReg,
          phoneNum: phoneNum,
          gender: gender,
          bankAcc: bankAcc
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
      setVehicleReg('')
      setVehicleType('')
      setBankAcc('')
      setPhoneNum('')
      setGender('')
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
    const vehicleRegChange = (ev) => {
      setVehicleReg(ev.target.value)
    }
    const vehicleTypeChange = (ev) => {
      setVehicleType(ev.target.value)
    }
    const phoneNumChange = (ev) => {
      setPhoneNum(ev.target.value)
    }
    const genderChange = (ev) => {
      setGender(ev.target.value)
    }
    const bankChange= (ev) => {
      setBankAcc(ev.target.value)
    }
  
    return (  
      <div>
        <h1 style={{
          backgroundColor:"slategray"
        }}>Vendor sign Up</h1>
        <form onSubmit={formSubmit}>
        <label htmlFor="userType"> Select your user type: </label>
            <select name="userType" id="userType" onChange={userTypeChange} required>
                <option value="vendor">Vendor</option>
                <option value="consumer">Consumer</option>
                <option value="rider">Rider</option>
            </select>
          <h4> First Name: </h4>
          <input type="text" value={firstName} onChange={firstNameChange} required/>
  
          <h4> Middle Name: </h4>
          <input type="text" value={lastName} onChange={lastNameChange} required/>
  
          <h4> Last Name: </h4>
          <input type="text" value={middleName} onChange={middleNameChange} required/>
  
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
  
          <h4> Vehicle Registration: </h4>
          <input type="text" value={vehicleReg} onChange={vehicleRegChange} required/>
  
          <h4> Vehicle Type: </h4>
          <input type="text" value={vehicleType} onChange={vehicleTypeChange} required/>
  
          <h4> Phone Number: </h4>
          <input type="text" value={phoneNum} onChange={phoneNumChange} required/>
  
          <h4> Gender: </h4>
          <input type="text" value={gender} onChange={genderChange} required/>
          
          <h4>Bank account:</h4>
          <input type="text" value={bankAcc} onChange={bankChange} required/>
  
          <h4></h4>
          <input type="submit" value="Sign up"/>
        </form>
      </div>
    );
  }

  
export default SignupRider;