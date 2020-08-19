import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getGroupById,
  addGroupById,
  deleteGroupById,
} from "../../actions/group";
import Challenges from "../challenges/Challenges";

// get id from URL (match)
const Group = ({ match, history }) => {
  const dispatch = useDispatch();
  const { group, loading } = useSelector((state) => state.group);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGroupById(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <Fragment>
      {group === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large">GROUP: {group.name}</h1>
          <p className="lead">
            <i className="fas fa-align-left"></i> {group.description}
          </p>
          <div className="dash-buttons">
            <Link to="/groups" className="btn btn-light">
              All Groups
            </Link>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
          </div>

          {auth.isAuthenticated &&
          auth.loading === false &&
          group.members.some((e) => e.user === auth.user._id) ? (
            <div className="dash-buttons">
              <Link to="/edit-group" className="btn btn-dark">
                Edit Group
              </Link>
              <a
                onClick={() =>
                  dispatch(deleteGroupById(match.params.id, history))
                }
                href="#!"
                className="btn btn-danger"
              >
                Delete Group
              </a>
            </div>
          ) : (
            <a
              onClick={() => dispatch(addGroupById(match.params.id, history))}
              href="#!"
              className="btn btn-dark"
            >
              Add Group
            </a>
          )}
          <hr />
          {auth.isAuthenticated ? (
            <Challenges groupId={match.params.id} />
          ) : (
            <div className="lead text-center text-grey">
              You must be logged in to view challenges...
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default Group;
