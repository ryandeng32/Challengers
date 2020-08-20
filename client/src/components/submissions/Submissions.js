import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubs } from "../../actions/submission";
import Spinner from "../layout/Spinner";
import SubItem from "./SubItem";
const Submissions = ({ group_id, challenge_id }) => {
  const dispatch = useDispatch();
  const { subs, loading } = useSelector((state) => state.submission);

  useEffect(() => {
    dispatch(getSubs(group_id, challenge_id));
  }, [dispatch, group_id, challenge_id]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <p className="lead text-grey">
        <i className="fas fa-eye"></i> View Submissions
      </p>
      <div className="submissions">
        {subs.length > 0 ? (
          subs.map((sub) => (
            <SubItem
              key={sub._id}
              sub={sub}
              group_id={group_id}
              challenge_id={challenge_id}
            />
          ))
        ) : (
          <h4 className="lead text-center text-grey">
            No Submissions found...
          </h4>
        )}
      </div>
    </Fragment>
  );
};
export default Submissions;
