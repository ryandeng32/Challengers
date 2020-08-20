import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getSub } from "../../actions/submission";
import Moment from "react-moment";
import { updateLike, deleteSub } from "../../actions/submission";
const Submission = ({ match }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { group_id, challenge_id, sub_id } = match.params;
  const sub = useSelector((state) => state.submission);
  useEffect(() => {
    dispatch(getSub(group_id, challenge_id, sub_id));
  }, []);

  if (sub.loading || !sub.sub) {
    return <Spinner />;
  }
  const { title, name, detail, user, likes, comments, date } = sub.sub;

  return (
    <Fragment>
      <Link
        to={`/groups/${group_id}/challenges/${challenge_id}`}
        className="btn btn-rounded"
      >
        Back
      </Link>
      <div className="submissions">
        <div className="submission">
          <h2>{title}</h2>
          <p>{detail}</p>
          <p>By {name}</p>
          <p className="sub-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button
            onClick={(e) =>
              dispatch(updateLike(group_id, challenge_id, sub_id))
            }
            type="button"
            className="btn btn-light"
          >
            {likes.length > 0 ? (
              <i className="fas fa-thumbs-up blue-like"> {likes.length} </i>
            ) : (
              <i className="fas fa-thumbs-up" />
            )}
          </button>

          {!auth.loading && user === auth.user._id && (
            <a
              href="#!"
              onClick={() =>
                dispatch(deleteSub(group_id, challenge_id, sub_id))
              }
              className="btn btn-danger"
            >
              Delete
            </a>
          )}
        </div>
      </div>
      <CommentForm
        group_id={group_id}
        challenge_id={challenge_id}
        sub_id={sub_id}
      />
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            group_id={group_id}
            challenge_id={challenge_id}
            comment={comment}
            sub_id={sub_id}
          />
        ))}
      </div>
    </Fragment>
  );
};
export default Submission;
