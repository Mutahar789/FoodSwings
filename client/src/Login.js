import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
const axios = require('axios')

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState(``)
    const [Pw, setPw] = React.useState(``)
    const [userType, setUserType] = React.useState(``)
    const [errMsg, setErrMsg] = React.useState('')

    const formSubmit = async (ev) => {
        ev.preventDefault()
        if(userType){
            const info = {
                userType: userType,
                email : email,
                password : Pw
            }
            try{
                await axios.post('https://foodswings.herokuapp.com/login', info, {withCredentials: true});
                navigate(`/${userType}/Home`)
            }
            catch (err) {
                setErrMsg('Username or password is incorrect')
            }
            setPw('')
            setEmail('')
        } else {
            setErrMsg('Please select user type')
        }
    }
    const emailChange = (ev) => {
        setEmail(ev.target.value)
    }
    const passwordChange = (ev) => {
        setPw(ev.target.value)
    }
    const userTypeChange = (ev, v) => {
        ev.preventDefault()
        setUserType(v)
    }
    return ( 
      <div>
        <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Login page</h2>
        <p className="lead ms-2"> Select your user type:</p>
        <div className="btn-group ms-2" required>
            <button className="btn btn-primary" onClick={(ev) => userTypeChange(ev, "vendor")}>Vendor</button>
            <button className="btn btn-warning" onClick={(ev) => userTypeChange(ev, "consumer")}>Consumer</button>
            <button className="btn btn-success" onClick={(ev) => userTypeChange(ev, "rider")}>Rider</button>
        </div>
        <form className="ms-2" onSubmit={formSubmit}>
            <br />
            <h4 className="lead fw-bold mt-2">Email:</h4>
            <input type="Email" value={email} onChange={emailChange} placeholder="email@id.com" required/>
            <h4 className="lead fw-bold mt-2">Password:</h4>
            <input type="password" value={Pw} onChange={passwordChange} placeholder="your password..." required/>
            <br /> <br />
            <input type="submit" className="btn btn-md btn-danger" value="login"/>
        </form>
        <br />
        <h2 className="lead text-danger ms-2 fw-bold">{errMsg}</h2> 
        <h2 className="ms-2" >Do not have an account? No problem!</h2>
        <Link to="/signup"><button className="btn btn-warning btn-lg ms-2"> Sign up / Register</button></Link>
        <br />
      </div>
     );
}

export default Login;