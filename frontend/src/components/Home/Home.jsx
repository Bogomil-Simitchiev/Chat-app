import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Talkie 👋</h1>
        <p className="home-description">
          Talkie is your friendly chat companion — connect, chat, and share moments with your friends in real time.
        </p>
        <p className="home-subtext">
          Whether you're catching up with old friends or making new ones, Talkie makes staying connected simple and fun.
        </p>
        <Link to="/register" className="get-started-btn">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;
