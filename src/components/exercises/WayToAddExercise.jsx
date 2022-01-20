import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { componentsModal } from "../../helpers/componentsModal";

const WayToAddExercise = () => {
  const dispatch = useDispatch();
  const { current: currentMuscle } = useSelector((state) => state.muscles);

  const handleClick = (typeToAdd) => {
    if (typeToAdd === "new")
      dispatch(
        setModal(true, "Add new exercise", componentsModal.exerciseList)
      );
    else
      dispatch(
        setModal(
          true,
          `Add exercise to ${currentMuscle.name}`,
          componentsModal.exerciseAddExisting
        )
      );
  };

  return (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleClick("new")}
      >
        New
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleClick("existing")}
      >
        Existing
      </Button>
    </Stack>
  );
};

export default WayToAddExercise;
