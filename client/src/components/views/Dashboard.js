import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";

import { getCurrentGroups } from "../../actions/group";
import { GROUPS_ERROR } from "../../actions/types";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { groups, loading } = useSelector((state) => state.group);
  useEffect(() => {
    dispatch(getCurrentGroups());
  }, []);

  return loading && groups.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {groups.length !== 0 ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not yet join any group, please join a group first</p>
          <Link to="/add-group" className="btn btn-primary my-1">
            Add Group
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
