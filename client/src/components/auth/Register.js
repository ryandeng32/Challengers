import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(register({ name, email, password }));
      console.log("SUCCESS");
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large">Sign Up</h1>
      <p className="lead">
        <i className="far fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            autoComplete="off"
            required
          />
        </div>
        <small className="form-text">
          You don't have to use a real email. Since the website is still in
          testing phase
        </small>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-lightblue" value="Register" />
      </form>
      <p className="form-link my-1">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
