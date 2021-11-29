import {Link} from 'react-router-dom';

const Signup = () => {
    return ( 
        <div>
            <h2 className="display-6">Sign up as: </h2>
            <div className="btn-group">
                <Link to="/signupVendor"><button className="text-white bt btn-lg btn-primary ">Vendor</button></Link>
                <Link to="/signupConsumer"><button className="text-white bt btn-lg btn-success">Consumer</button></Link>
                <Link to="/signupRider"><button className="text-white bt btn-lg btn-danger">Rider</button></Link>
            </div>
        </div>
     );
}

export default Signup;