import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  if (alerts !== null && alerts.length > 0) {
    console.log(alerts);
    return (
      <ul>
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default Alert;
