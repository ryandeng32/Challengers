import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const GroupItem = (group) => {
  const auth = useSelector((state) => state.auth);
  const { _id, name, description, members } = group.group;

  if (auth.loading) {
    return null;
  }
  return (
    <div className="group bg-light">
      <div>
        {console.log(auth)}
        {auth.user && members.some((el) => el.user === auth.user._id) && (
          <i className="fas fa-check-circle saved"></i>
        )}
        <h2>{name}</h2>
        <p>{description}</p>
        <Link to={`/groups/${_id}`} className="btn btn-primary">
          View Group
        </Link>
      </div>
    </div>
  );
};

export default GroupItem;
