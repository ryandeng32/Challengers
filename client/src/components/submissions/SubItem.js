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
      <div className="sub-content">
        <h3 className="sub-title">{title}</h3>
        <p className="detail">{detail}</p>
      </div>
      <hr className="sub-hr" />
      <p className="sub-date text-grey">
        <i className="fas fa-clock " />
        <Moment format="YY/MM/DD">{date}</Moment>
      </p>
      <p className="name text-grey">{name}</p>

      <div className="sub-action">
        <div className="action-1">
          {" "}
          <button
            onClick={(e) =>
              dispatch(updateLike(group_id, challenge_id, sub_id))
            }
            type="button"
            className="btn like-btn"
          >
            {likes.some((el) => el.user.toString() === auth.user._id) ? (
              <i className="fas fa-thumbs-up blue-like"> </i>
            ) : (
              <i className="fas fa-thumbs-up" />
            )}
            {likes.length}
          </button>
          <Link
            to={`/groups/${group_id}/challenges/${challenge_id}/submissions/${sub_id}`}
            className="btn discussion"
          >
            <p>
              Discussion
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </p>
          </Link>
        </div>
        {!auth.loading && user === auth.user._id && (
          <a
            href="#!"
            onClick={() => dispatch(deleteSub(group_id, challenge_id, sub_id))}
            className="btn delete-sub btn-danger"
          >
            Delete
          </a>
        )}
      </div>
    </div>
  );
};
export default withRouter(SubItem);
