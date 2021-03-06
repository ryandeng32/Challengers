import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../layout/Spinner";

const Landing = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="landing-info">
        <div className="landing-inner">
          <h1 className="title">Demo Page</h1>
          <p>Sign up and try!"</p>
        </div>

        <div>
          <Link to="/register" className="btn btn-rounded">
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
