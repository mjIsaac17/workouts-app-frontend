import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { startUpdatingExercise } from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";
import { useForm } from "../../hooks/useForm";

export const DetailsExercise = () => {
  const dispatch = useDispatch();
  const { urlMuscleId } = useParams();
  const { current } = useSelector((state) => state.exercises);
  const { isAdmin } = useSelector((state) => state.user.user);
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));

  const [formValues, handleInputChange, setSpecificValue] = useForm({
    ...current,
    muscleId: urlMuscleId,
    newImage: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", formValues);
    dispatch(startUpdatingExercise(formValues, urlMuscleId));
  };

  return (
    <form onSubmit={handleSubmit}>
      <hr />
      <div className="margin-y-1">
        <label>Exercise name</label>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          defaultValue={current.name}
          className="inputIcon margin-y-1"
          disabled={!isAdmin}
        />
      </div>
      <div className="margin-y-1">
        <label>Exercise description</label>
        <textarea
          onChange={handleInputChange}
          disabled={!isAdmin}
          name="description"
          className="inputIcon"
          defaultValue={current.description}
          id="txtModalDescription"
          rows="3"
        ></textarea>
      </div>
      <select
        className="w-100 margin-y-1"
        id="ddlMuscleUpdateExercise" //drop down list
        defaultValue={urlMuscleId}
        onChange={handleInputChange}
        name="muscleId"
        // onChange={handleSelect}
      >
        <option value={0}>Select muscle</option>
        {muscleList.map((muscle) => (
          <option key={`ddlMuscleAddExercise-${muscle.id}`} value={muscle.id}>
            {muscle.name}
          </option>
        ))}
      </select>
      <div className="margin-y-1">
        <label>Current image</label>
        <img
          style={{ marginTop: "0.5rem" }}
          src={`../img/exercises/${current.image_name}`}
          alt={current.image}
        />
      </div>
      <div>
        <label>New image</label>
        <input
          className="margin-y-1"
          type="file"
          name="newImage"
          onChange={(e) => setSpecificValue("newImage", e.target.files[0])}
        />
      </div>
      <div className="right">
        <button
          className="btn btn-secondary margin-x-1"
          type="button"
          onClick={() => dispatch(setModal(false, ""))}
        >
          Close
        </button>
        {isAdmin && (
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        )}
      </div>
    </form>
  );
};
