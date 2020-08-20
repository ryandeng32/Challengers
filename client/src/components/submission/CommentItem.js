import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../actions/submission";
const CommentItem = ({ comment, group_id, challenge_id, sub_id }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { _id: comment_id, text, user, date, name } = comment;
  return (
    <div>
      <h2>{name}</h2>
      <p>{text}</p>
      <p>
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) =>
            dispatch(deleteComment(group_id, challenge_id, sub_id, comment_id))
          }
        >
          Delete
        </button>
      )}
    </div>
  );
};
export default CommentItem;
