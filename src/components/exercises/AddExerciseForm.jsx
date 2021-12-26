import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { useDispatch } from "react-redux";
import { startAddingExercise } from "../../actions/exercise.action";
import { setSnackbar } from "../../actions/snackbar.action";

import { useForm } from "../../hooks/useForm";
import { InputFile } from "../ui/InputFile";

export const AddExerciseForm = ({ muscleList, muscleId = 0, handleModal }) => {
  // console.log("render <AddExerciseForm/> ");

  const dispatch = useDispatch();

  // custom hooks
  const [formValues, handleInputChange, setSpecificValue] = useForm({
    name: "",
    description: "",
    muscleId,
    image: null,
  });

  // functions
  const isFormValid = () => {
    if (!formValues.name) {
      dispatch(setSnackbar("error", "Invalid exercise name", true));
      return false;
    }
    if (formValues.muscleId === 0) {
      dispatch(setSnackbar("error", "Select a valid muscle", true));
      return false;
    }

    const image = document.getElementById("image").files[0];
    if (!image) {
      dispatch(setSnackbar("error", "Select an image", true));
      return false;
    }

    return true;
  };

  const setImage = () => {
    const image = document.getElementById("image").files[0];
    setSpecificValue("image", image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formValues);
    if (isFormValid()) dispatch(startAddingExercise(formValues));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-box space-between">
        <TextField
          size="small"
          name="name"
          required
          label="Exercise name"
          onChange={handleInputChange}
          sx={{ width: "49%" }}
          // helperText={error}
          // error={!!error}
        />
        <FormControl sx={{ width: "49%" }}>
          <InputLabel id="labelExerciseId">Muscle</InputLabel>
          <Select
            id="ddlMuscleAddExercise" //drop down list
            value={formValues.muscleId}
            labelId="labelExerciseId"
            label="Muscle"
            onChange={(e) => setSpecificValue("muscleId", e.target.value)}
            size="small"
            name="muscleId"
          >
            {muscleId === 0 && (
              <MenuItem key={"ddlMuscleAddExercise-0"} value={muscleId}>
                Select a muscle
              </MenuItem>
            )}

            {muscleList.map((muscle) => (
              <MenuItem
                key={`ddlMuscleAddExercise-${muscle.id}`}
                value={muscle.id}
              >
                {muscle.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TextField
        sx={{ margin: "1rem 0" }}
        size="small"
        name="description"
        fullWidth
        label="Description"
        multiline
        rows="3"
        onChange={handleInputChange}
      />
      <InputFile id="image" name="image" onChangeFunction={setImage} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        className="m-t--2"
      >
        <Button
          variant="contained"
          color="info"
          onClick={() => handleModal(false, "")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<SaveIcon />}
          color="success"
          type="submit"
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};
