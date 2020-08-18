import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-group" className="btn btn-light">
        <i className="fas fa-layer-group text-primary"></i>Edit Group
      </Link>
      <Link to="/add-group" className="btn btn-light">
        <i className="fas fa-layer-plus text-primary"></i>Add Group
      </Link>
    </div>
  );
};
export default DashboardActions;
