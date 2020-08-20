import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSub } from "../../actions/submission";
const UploadSubmission = ({ group_id, challenge_id }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    selectedFile: null,
    title: "",
    detail: "",
  });
  const { title, detail } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addSub(group_id, challenge_id, formData));
  };
  return (
    <Fragment>
      <div className="large text-center">Upload Submission</div>
      <form className="form" onSubmit={onSubmit}>
        {/* Image Upload */}

        <div className="form-group">
          <input
            type="text"
            placeholder="Title:"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            autoComplete="off"
            required
          />
        </div>
        <textarea
          rows="5"
          placeholder="Detail:"
          name="detail"
          value={detail}
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

export default withRouter(UploadSubmission);
