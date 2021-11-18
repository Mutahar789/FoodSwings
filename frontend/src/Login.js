import React from 'react';
import {Link} from 'react-router-dom';
const https = require('https');
const axios = require('axios')

const Login = () => {
    const [email, setEmail] = React.useState(``)
    const [Pw, setPw] = React.useState(``)
    const [userType, setUserType] = React.useState(`vendor`)
    const formSubmit = async (ev) => {
        ev.preventDefault()
        const info = {
            userType: userType,
            email : email,
            password : Pw
        }
        axios.post('http://localhost:8000/login', info)

        setUserType('')
        setEmail('')
        setPw('')
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
    return ( 
      <div>
          <h1>Login</h1>
        <form onSubmit={formSubmit}>
            <label htmlFor="userType"> Select your user type: </label>
            <select name="userType" id="userType" onChange={userTypeChange} required>
                <option value="vendor">Vendor</option>
                <option value="consumer">Consumer</option>
                <option value="rider">Rider</option>
            </select>
            <h4>Email:</h4>
            <input type="Email" value={email} onChange={emailChange} required/>
            <h4>Password:</h4>
            <input type="text" value={Pw} onChange={passwordChange} required/>
            <h4> </h4>
            <input type="submit" value="login"/>
        </form>
        <h2>Do not have an account? No problem!</h2>
        <Link to="/signup">Sign up now</Link>
      </div>
     );
}

export default Login;