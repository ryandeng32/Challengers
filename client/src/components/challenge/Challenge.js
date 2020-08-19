import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { getChallenge, deleteChallenge } from "../../actions/challenge";
// get id from URL (match)
const Challenge = ({ match, history }) => {
  const dispatch = useDispatch();
  const { group_id, challenge_id } = match.params;
  const { challenge, loading } = useSelector((state) => state.challenge);
  useEffect(() => {
    dispatch(getChallenge(group_id, challenge_id));
  }, [dispatch, group_id, challenge_id]);

  if (!challenge || loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <h1 className="large">CHALLENGE: {challenge.name}</h1>
      <p className="lead">
        <i className="fas fa-align-left"></i> {challenge.description}
      </p>
      <div className="dash-buttons">
        <Link to={`/groups/${group_id}`} className="btn btn-light">
          Back to Group
        </Link>
        <Link to="/dashboard" className="btn btn-light">
          Dashboard
        </Link>
      </div>
      <div className="dash-buttons">
        <Link to="/edit-challenge" className="btn">
          Edit Challenge
        </Link>
        <a
          href="#!"
          onClick={() => {
            dispatch(deleteChallenge(group_id, challenge_id, history));
          }}
          className="btn btn-danger"
        >
          Delete Challenge
        </a>
      </div>
      <hr />
    </Fragment>
  );
};
export default Challenge;
