import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editChallenge } from "../../actions/challenge";

const EditChallenge = ({ history }) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.group);
  const challenge = useSelector((state) => state.challenge.challenge);

  const [formData, setFormData] = useState({
    name: challenge.name,
    description: challenge.description,
  });

  const { name, description } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editChallenge(formData, history, group._id, challenge._id));
  };
  return (
    <Fragment>
      <h1 className="large">Editing Challenge</h1>
      <p className="lead">
        <i className="fas fa-layer-group"></i> Edit your challenge
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <small className="form-text">field with * is required</small>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            autoComplete="off"
          />
          <small className="form-text">Name of the challenge</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            autoComplete="off"
          />
          <small className="form-text">Description of the challenge</small>

          <div className="dash-buttons my-1">
            <input
              type="submit"
              className="btn btn-lightblue"
              value="Confirm"
            />
            <Link
              className="btn btn-light"
              to={`/groups/${group._id}/challenges/${challenge._id}`}
            >
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default EditChallenge;
