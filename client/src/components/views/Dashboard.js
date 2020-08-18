import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGroups } from "../../actions/group";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const group = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(getCurrentGroups());
  }, []);
  return <div>upload</div>;
};

export default Dashboard;
