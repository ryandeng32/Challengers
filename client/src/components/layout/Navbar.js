import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = ({ bg }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const authLinks = (
    <ul>
      <li>
        <a
          onClick={() => {
            dispatch(logout());
          }}
          href="#!"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className={`navbar ${bg}`}>
      <h1>
        <Link to="/">
          <i className="fas fa-palette"></i> Team Creativity
        </Link>
      </h1>
      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
