import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <Link to="/categories">View Todo Categories</Link>
      </nav>
      <nav>
        <Link to="/taskPage">View TaskPage</Link>
      </nav>
    </div>
  );
};

export default Home;
