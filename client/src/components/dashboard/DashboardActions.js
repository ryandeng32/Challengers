import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/create-group" className="btn btn-light">
        <i className="fas fa-plus"></i> Create New Group
      </Link>
      <Link to="/groups" className="btn btn-light">
        <i className="fas fa-layer-group"></i> Browse All Group
      </Link>
    </div>
  );
};
export default DashboardActions;
