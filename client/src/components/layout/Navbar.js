import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = ({ navColor }) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  // If user is authenticated (logged in)
  const authLinks = (
    <ul>
      <li>
        <Link to="/groups">Groups</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> Dashboard
        </Link>
      </li>
      <li>
        <a
          onClick={() => {
            dispatch(logout());
          }}
          href="/"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );

  // user is not logged in
  const guestLinks = (
    <ul>
      <li>
        <Link to="/groups">Groups</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  // render null when fetching authentication info from server
  if (loading) {
    return null;
  }
  return (
    <nav className={`navbar ${navColor}`}>
      <h1>
        <Link to="/">
          <i className="fas fa-palette"></i> Team Creativity
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
