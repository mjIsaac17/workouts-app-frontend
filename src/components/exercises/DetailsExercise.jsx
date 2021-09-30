import React from "react";
import { useSelector } from "react-redux";

export const DetailsExercise = () => {
  const { current } = useSelector((state) => state.exercises);
  return (
    <div>
      <hr />
      <div className="margin-y-1">
        <label>Exercise name</label>
        <input type="text" defaultValue={current.name} className="inputIcon" />
      </div>
      <div className="margin-y-1">
        <label>Exercise description</label>
        <textarea
          className="inputIcon"
          defaultValue={current.description}
          id="txtModalDescription"
          rows="3"
        ></textarea>
      </div>
      <div className="margin-y-1">
        <label>Image</label>
        <img
          style={{ marginTop: "0.5rem" }}
          src={`../img/exercises/${current.image_name}`}
          alt=""
        />
      </div>
      <div className="right">
        <button
          className="btn btn-secondary margin-x-1"
          type="button"
          // onClick={() => handleModal(false, "")}
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
    </div>
  );
};
