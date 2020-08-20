import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { updateLike, deleteSub } from "../../actions/submission";
const SubItem = ({
  challenge_id,
  group_id,
  sub: { _id: sub_id, title, name, detail, user, likes, comments, date },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="submission">
      <h2>{title}</h2>
      <p>{detail}</p>
      <p>By {name}</p>
      <p className="sub-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button
        onClick={(e) => dispatch(updateLike(group_id, challenge_id, sub_id))}
        type="button"
        className="btn btn-light"
      >
        {likes.length > 0 ? (
          <i className="fas fa-thumbs-up blue-like"> {likes.length} </i>
        ) : (
          <i className="fas fa-thumbs-up" />
        )}
      </button>
      <Link
        to={`/groups/${group_id}/challenges/${challenge_id}/submissions/${sub_id}`}
        className="btn"
      >
        Discussion
        {comments.length > 0 && (
          <span class="comment-count">{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <a
          href="#!"
          onClick={() => dispatch(deleteSub(group_id, challenge_id, sub_id))}
          className="btn btn-danger"
        >
          Delete
        </a>
      )}
    </div>
  );
};
export default withRouter(SubItem);
