import React, { useState } from "react";
import { FormControl, Stack, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import { useDispatch } from "react-redux";
import { startAddingExercise } from "../../actions/exercise.action";
import { setSnackbar } from "../../actions/snackbar.action";

import { useForm } from "../../hooks/useForm";
import { InputFile } from "../ui/InputFile";
import MultipleSelect from "../ui/MultipleSelect";

export const AddExerciseForm = ({
  muscleList,
  selectedMuscleName = "",
  handleModal,
}) => {
  // console.log("render <AddExerciseForm/> ");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // custom hooks
  const [formValues, handleInputChange, setSpecificValue] = useForm({
    name: "",
    description: "",
    image: null,
  });

  // functions
  const isFormValid = (muscleNames) => {
    if (!formValues.name) {
      dispatch(setSnackbar("error", "Invalid exercise name", true));
      return false;
    }

    if (muscleNames === "") {
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
    const muscleNames = document.getElementsByName("muscleNames")[0].value;
    if (isFormValid(muscleNames)) {
      setLoading(true);
      dispatch(startAddingExercise({ ...formValues, muscleNames }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-box space-between space-elements-y--1 ">
        <TextField
          className="w49"
          size="small"
          name="name"
          required
          label="Exercise name"
          onChange={handleInputChange}
        />
        <FormControl className="w49">
          <MultipleSelect
            items={muscleList}
            placeholder="Select muscles"
            name="muscleNames"
            defaultValues={selectedMuscleName}
          />
        </FormControl>
      </div>

      <TextField
        sx={{ margin: "0.5rem 0" }}
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
        <LoadingButton
          color="success"
          endIcon={<SaveIcon />}
          loading={loading}
          loadingPosition="end"
          type="submit"
          variant="contained"
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  );
};
