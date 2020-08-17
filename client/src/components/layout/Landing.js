import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-img">
        <div className="landing-inner">
          <h1 className="title">Demo Page</h1>
          <p className="follow">
            Welcome to our team's demo page. This page now has the following
            features
          </p>
          <ul className="feature-list">
            <li>Landing Page</li>
            <li>User Authentication with JWT</li>
          </ul>
        </div>

        <div className="buttons">
          <Link to="/register" className="btn  btn-rounded">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-blue btn-rounded">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
