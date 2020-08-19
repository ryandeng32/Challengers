import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getChallenges } from "../../actions/challenge";
import Spinner from "../layout/Spinner";
import ChallengeItem from "./ChallengeItem";
export const Challenges = ({ groupId }) => {
  const dispatch = useDispatch();
  const { challenges, loading } = useSelector((state) => state.challenge);
  useEffect(() => {
    dispatch(getChallenges(groupId));
  }, [dispatch, groupId]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/create-challenge" className="btn btn-light">
            New Challenge
          </Link>

          <div className="challenges">
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <ChallengeItem
                  key={challenge._id}
                  groupId={groupId}
                  challenge={challenge}
                />
              ))
            ) : (
              <h4 className="lead text-center text-grey">
                No challenges found...
              </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Challenges;
