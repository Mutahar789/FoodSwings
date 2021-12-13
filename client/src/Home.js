import {Link} from 'react-router-dom'

const Home = () => {
    return (
      <div>
          <h2 className="display-6 text-white bg-primary text-center fw-bold py-1">Home page</h2>
          <h2 className="display-6 ms-2 my-5 text-center">Hungry? Don't worry we got you covered!</h2>
          <div className="container">
            <div className="row text-center">
                      <div className="col text-center">
                      <Link to="/login"><button className="btn btn-lg btn-danger fw-bold" style={{
                          "width":"25%" 
                      }}>Order now</button></Link>
                      </div>
            </div>
          </div>
      </div>
    );
  }
  export default Home;