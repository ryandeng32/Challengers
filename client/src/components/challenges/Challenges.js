import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChallenges } from "../../actions/challenge";
import Spinner from "../layout/Spinner";
import ChallengeItem from "./ChallengeItem";
export const Challenges = ({ groupId }) => {
  const dispatch = useDispatch();
  console.log(groupId);
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
              <h4>No challenges found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Challenges;
