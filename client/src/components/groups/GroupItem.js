import React from "react";
import { Link } from "react-router-dom";

const GroupItem = (group) => {
  const { _id, name, description } = group.group;
  return (
    <div className="group bg-light">
      <div>
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
