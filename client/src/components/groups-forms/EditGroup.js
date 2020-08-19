import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editGroup } from "../../actions/group";

const EditGroup = ({ history }) => {
  const dispatch = useDispatch();
  const { group, loading } = useSelector((state) => state.group);

  const [formData, setFormData] = useState({
    name: group.name,
    description: group.description,
  });

  const { name, description } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editGroup(formData, history, group._id));
  };
  if (loading) {
    return null;
  }
  return (
    <Fragment>
      <h1 className="large">Editing</h1>
      <p className="lead">
        <i className="fas fa-layer-group"></i> Let's create a group and start
        hosting challenges!
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
          <small className="form-text">Name of the group</small>
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
          <small className="form-text">Description of the group</small>

          <div className="dash-buttons my-1">
            <input type="submit" className="btn btn-lightblue" value="Submit" />
            <Link className="btn btn-light" to="/dashboard">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default EditGroup;
