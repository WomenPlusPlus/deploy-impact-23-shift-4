import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h3>Homepage</h3>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
