import React, { Fragment, useState } from "react";
const UploadSubmission = () => {
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
  return (
    <Fragment>
      <div className="large text-center">Upload Submission</div>
      <form className="form">
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

export default UploadSubmission;
