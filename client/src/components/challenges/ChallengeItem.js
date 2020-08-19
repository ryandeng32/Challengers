import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ChallengeItem = ({ groupId, challenge }) => {
  const auth = useSelector((state) => state.auth);

  if (auth.loading) {
    return null;
  }
  return (
    <div className="challenge bg-light">
      <div>
        {auth.user &&
          challenge.members.some((el) => el.user === auth.user._id) && (
            <i className="fas fa-check-circle saved"></i>
          )}
        <h2>{challenge.name}</h2>
        <p>{challenge.description}</p>
        <Link
          to={`/groups/${groupId}/challenges/${challenge._id}`}
          className="btn btn-primary"
        >
          View Challenge
        </Link>
      </div>
    </div>
  );
};

export default ChallengeItem;
