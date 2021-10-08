import { Add } from "@mui/icons-material";
import { Fab, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { WorkoutAdd } from "./WorkoutAdd";

export const WorkoutsScreen = () => {
  const dispatch = useDispatch();
  const { componentName } = useSelector((state) => state.modal);

  const handleAdd = () => {
    dispatch(setModal(true, "Add new workout", componentsModal.workoutsAdd));
  };

  return (
    <>
      <h2>Workouts</h2>
      <Stack spacing={1}>
        <Fab
          onClick={handleAdd}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          color="primary"
          aria-label="add-workout"
        >
          <Add />
        </Fab>
      </Stack>
      {componentName === componentsModal.workoutsAdd && (
        <Modal>
          <WorkoutAdd />
        </Modal>
      )}
    </>
  );
};
