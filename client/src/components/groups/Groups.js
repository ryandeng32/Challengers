import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import GroupItem from "./GroupItem";
import { getGroups } from "../../actions/group";

const Groups = () => {
  const dispatch = useDispatch();
  const { groups, loading } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return <div>hi</div>;
};
export default Groups;
