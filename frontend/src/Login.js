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
        console.log("HELLO")
        const info = {
            userType: userType,
            email : email,
            password : Pw
        }

        try{
            const res = await axios.post('http://localhost:3001/login', info, {withCredentials: true});
            if(res.data.err){
                setErrMsg(res.data.err)
            } 
            if(res.data.redirect) {
                navigate(res.data.redirect)
            }
        }
        catch (err) {
            console.log(err);
        }
        setPw('')
        setEmail('')
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
            <br /> <br />
            <h4>Email:</h4>
            <input type="Email" value={email} onChange={emailChange} placeholder="email@id.com" required/>
            <h4>Password:</h4>
            <input type="text" value={Pw} onChange={passwordChange} placeholder="your password..." required/>
            <br /> <br />
            <input type="submit" className="btn btn-md btn-danger" value="login"/>
        </form>
        <br />
        <h2 className="lead text-danger ms-2">{errMsg}</h2> 
        <h2 className="ms-2" >Do not have an account? No problem!</h2>
        <Link to="/signup"><button className="btn btn-warning btn-lg ms-2"> Sign up / Register</button></Link>
        <br />
      </div>
     );
}

export default Login;