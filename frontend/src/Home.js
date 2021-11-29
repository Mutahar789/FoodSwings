import {Link} from 'react-router-dom'

const Home = () => {
    return (
      <div>
          <h2 className="display-6 ms-2">Hungry? Don't worry we got you covered!</h2>
          <Link to="/login"><button className="btn btn-primary btn-lg ms-2 mt-5">Order now</button></Link>
      </div>
    );
  }
  export default Home;