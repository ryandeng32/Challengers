import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import GroupItem from "./GroupItem";
import { getGroups } from "../../actions/group";

const Groups = () => {
  const dispatch = useDispatch();
  const { all_groups, loading } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Groups</h1>
          <p className="lead">
            <i className="fas fa-eye"></i> Browse and add new groups!
          </p>
          <hr />
          <div className="groups">
            {all_groups.length > 0 ? (
              all_groups.map((group) => (
                <GroupItem key={group._id} group={group} />
              ))
            ) : (
              <h4>No groups found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Groups;
