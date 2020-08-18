import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGroupById } from "../../actions/group";

// get id from URL (match)
const Group = ({ match }) => {
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
          <Link to="/groups" className="btn btn-light">
            Back To Groups
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            group.members.some((e) => e.user === auth.user._id) && (
              <Link to="/edit-group" className="btn btn-dark">
                Edit Group
              </Link>
            )}
          <div class="group-grid">
            <div>{group.name}</div>
            <div>{group.description}</div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Group;
