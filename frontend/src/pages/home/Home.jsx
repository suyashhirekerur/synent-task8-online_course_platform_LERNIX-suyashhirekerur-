import React from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css';
import Testimonials from '../../components/testimonials/Testimonials';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <ul className="particles">
          {[...Array(15)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
        <div className="home-content">
          <h1>Welcome to our eLearning Platform - Lernix</h1>
          <p>Learn, Grow, Achieve</p>
          <button onClick={() => navigate("/courses")} className='common-btn'>Get Started</button>
        </div>
      </div>
      <Testimonials />
    </div>

  );
};

export default Home;