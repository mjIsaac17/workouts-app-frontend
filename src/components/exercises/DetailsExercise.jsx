import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentExercise } from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";

export const DetailsExercise = ({ exerciseList }) => {
  // console.log("render details");
  const dispatch = useDispatch();

  // selectors
  const { current: currentExercise } = useSelector((state) => state.exercises);

  // states
  const [currentIndex, setCurrentIndex] = useState(
    exerciseList.findIndex((e) => e.id === currentExercise.id)
  );

  // functions
  const handleSetNewExercise = (navigate = "next") => {
    let newExercise = {};
    if (navigate === "next") {
      if (exerciseList[currentIndex + 1]) {
        newExercise = exerciseList[currentIndex + 1];
        setCurrentIndex(currentIndex + 1);
      } else {
        newExercise = exerciseList[0];
        setCurrentIndex(0);
      }
    } else {
      if (exerciseList[currentIndex - 1]) {
        newExercise = exerciseList[currentIndex - 1];
        setCurrentIndex(currentIndex - 1);
      } else {
        newExercise = exerciseList[exerciseList.length - 1];
        setCurrentIndex(exerciseList.length - 1);
      }
    }
    dispatch(setCurrentExercise(newExercise));
  };

  const handleImageClick = () => {
    if (currentExercise.imageUrl)
      window.open(currentExercise.imageUrl, "_blank");
  };
  if (currentExercise)
    return (
      <div className="modal-details">
        <button
          type="button"
          className="btn__navigation btn__navigation--previous"
          onClick={() => handleSetNewExercise("previous")}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="btn__navigation btn__navigation--next"
          onClick={() => handleSetNewExercise("next")}
        >
          {">"}
        </button>
        <div className="modal-details__image-section">
          <img
            onClick={handleImageClick}
            className="image"
            src={
              currentExercise.imageUrl
                ? currentExercise.imageUrl
                : `${process.env.PUBLIC_URL}/img/default.jpg`
            }
            alt={currentExercise.imageName}
          />
        </div>
        <div className="modal-details__form-section">
          <div style={{ height: "100%" }}>
            {currentExercise.description !== "" && (
              <div className="details details__description">
                <Typography>{currentExercise.description}</Typography>
              </div>
            )}
            <div className="details">
              <Typography>Category: {currentExercise.muscleNames}</Typography>
            </div>
          </div>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              color="info"
              onClick={() => dispatch(setModal(false, ""))}
              size="small"
            >
              Close
            </Button>
          </Stack>
        </div>
      </div>
    );
  else return <p>Loading ... </p>;
};
