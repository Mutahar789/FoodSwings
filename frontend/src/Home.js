import {Link} from 'react-router-dom'

const Home = () => {
    return (
      <div>
          <h2>Hungry? Don't worry we got you covered!</h2>
          <Link to="/login">Order now</Link>
      </div>
    );
  }
  export default Home;