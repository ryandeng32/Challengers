import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/submission";

const CommentForm = ({ group_id, challenge_id, sub_id }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(group_id, challenge_id, sub_id, { text }));
    setText("");
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <Fragment>
      <div className="large text-center">Leave a comment</div>
      <form className="form" onSubmit={onSubmit}>
        <textarea
          rows="5"
          placeholder="Text:"
          name="text"
          value={text}
          onChange={(e) => onChange(e)}
        />
        <input
          type="submit"
          className="btn btn-lightblue my-2"
          value="Submit"
        />
      </form>
    </Fragment>
  );
};
export default CommentForm;
