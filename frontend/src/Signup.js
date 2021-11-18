import {Link} from 'react-router-dom';

const Signup = () => {
    return ( 
        <div>
            <h1>Sign up</h1>
            <h2>Sign up as: </h2>
            <Link to="/signupVendor">Vendor</Link>
            <br />
            <Link to="/signupConsumer">Consumer</Link>
            <br />
            <Link to="/signupRider">Rider</Link>
            <br />
        </div>
     );
}

export default Signup;