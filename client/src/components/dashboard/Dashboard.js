import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentGroups } from "../../actions/group";
import GroupItem from "../groups/GroupItem";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { groups, loading: groupLoading } = useSelector((state) => state.group);
  useEffect(() => {
    dispatch(getCurrentGroups());
  }, [dispatch]);

  return (authLoading || groupLoading) && groups.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      <DashboardActions />
      <hr />
      {groups.length !== 0 ? (
        <div className="groups">
          {groups.map((group) => (
            <GroupItem key={group._id} group={group} />
          ))}
        </div>
      ) : (
        <Fragment>
          <p className="lead text-center text-grey">
            You have not yet join any group, please join a group first
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
