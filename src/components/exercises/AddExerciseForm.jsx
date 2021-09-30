import React from "react";
import { useDispatch } from "react-redux";
import { startAddingExercise } from "../../actions/exercise.action";
import { setSnackbar } from "../../actions/snackbar.action";

import { useForm } from "../../hooks/useForm";

export const AddExerciseForm = ({
  muscleList,
  defaultValue = 0,
  handleModal,
}) => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange, setSpecificValue] = useForm({
    name: "",
    description: "",
    muscleId: defaultValue,
    image: null,
  });
  //   const { exercise, description, muscleId, image } = formValues;

  const isFormValid = () => {
    if (!formValues.name) {
      dispatch(setSnackbar("error", "Invalid exercise name", true));
      return false;
    }
    if (formValues.muscleId === 0) {
      dispatch(setSnackbar("error", "Select a valid muscle", true));
      return false;
    }
    if (!formValues.image) {
      dispatch(setSnackbar("error", "Select an image", true));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValues);
    if (isFormValid()) {
      dispatch(startAddingExercise(formValues));
      handleModal(false, "");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <hr />
      {/* <img src="" alt="" /> */}
      <div style={{ marginTop: "2rem" }} className="inputIcon margin-y-1">
        <input
          type="text"
          placeholder="Exercise name"
          onChange={handleInputChange}
          name="name"
        />
      </div>
      <div className="inputIcon">
        <textarea
          rows="3"
          placeholder="Description"
          onChange={handleInputChange}
          name="description"
        ></textarea>
      </div>
      <select
        className="w-100 margin-y-1"
        id="ddlMuscleAddExercise" //drop down list
        defaultValue={defaultValue}
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
      <input
        className="margin-y-2"
        type="file"
        onChange={(e) => setSpecificValue("image", e.target.files[0])}
        name="image"
      />
      <div className="right">
        <button
          className="btn btn-secondary margin-x-1"
          type="button"
          onClick={() => handleModal(false, "")}
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
