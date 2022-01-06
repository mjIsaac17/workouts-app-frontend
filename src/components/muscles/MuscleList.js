import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import {
  setCurrentMuscle,
  startGettingMuscles,
} from "../../actions/muscles.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { AddMuscle } from "./AddMuscle";
import { MuscleItem } from "./MuscleItem";
import Fab from "@mui/material/Fab";
import { Add, Close, Edit } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { setSnackbar } from "../../actions/snackbar.action";
import { MuscleDetails } from "./MuscleDetails";
import { Tooltip, Typography } from "@mui/material";

export const MusclesList = () => {
  // console.log("render <musclesList/>");

  const dispatch = useDispatch();

  // selectors
  const { muscleList, loading } = useSelector((state) => state.muscles);
  const { isAdmin } = useSelector((state) => state.auth.user);
  const modalState = useSelector((state) => state.modal);

  // states
  const [editMode, setEditMode] = useState(false);

  // effects
  useEffect(() => {
    if (muscleList.length === 0) {
      dispatch(startGettingMuscles());
      // console.log("effect startgettingMuscles");
    }
  }, [dispatch, muscleList]);

  useEffect(() => {
    if (muscleList.length > 0) {
      // console.log("effect saveMuscleList");
      localStorage.setItem("muscleList", JSON.stringify(muscleList));
    }
  }, [muscleList]);

  // constants & variables
  const fabEditStyle = !editMode
    ? {
        color: "white",
        bgcolor: "#109EB4",
        "&:hover": {
          bgcolor: "#1087B4",
        },
      }
    : {
        color: "white",
        bgcolor: "#FE4343",
        "&:hover": {
          bgcolor: "#DF0000",
        },
      };

  // functions
  const handleEditMode = () => {
    setEditMode(!editMode);
    dispatch(setSnackbar("info", "Select a muscle to edit it", !editMode));
  };
  //set current muscle in the state
  const handleMuscleClick = (currentMuscle) => {
    dispatch(setCurrentMuscle(currentMuscle));
    if (editMode)
      dispatch(setModal(true, "Edit muscle", componentsModal.muscleItem));
  };

  if (loading) return <h1>Loading...</h1>;
  else
    return (
      <>
        <Typography variant="h4" textAlign="center" margin={3}>
          Muscles
        </Typography>

        <div className="card-grid-container">
          {muscleList.map((muscle) => (
            <MuscleItem
              key={muscle.id}
              muscle={muscle}
              editMode={editMode}
              onMuscleCardClick={handleMuscleClick}
            />
          ))}
        </div>

        {isAdmin && (
          <Stack
            direction="column"
            spacing={1}
            sx={{
              position: "fixed",
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
          >
            <Tooltip title={!editMode ? "Edit muscle" : "Cancel editing"}>
              <Fab
                sx={{ ...fabEditStyle }}
                aria-label="edit"
                onClick={handleEditMode}
              >
                {!editMode ? <Edit /> : <Close />}
              </Fab>
            </Tooltip>
            <Tooltip title="Add new muscle">
              <Fab
                color="primary"
                aria-label="edit"
                onClick={() =>
                  dispatch(
                    setModal(true, "Add new muscle", componentsModal.muscleList)
                  )
                }
              >
                <Add />
              </Fab>
            </Tooltip>
          </Stack>
        )}

        {modalState.componentName === componentsModal.muscleList && (
          <Modal>
            <AddMuscle />
          </Modal>
        )}
        {modalState.componentName === componentsModal.muscleItem && (
          <Modal modalSize="md">
            <MuscleDetails />
          </Modal>
        )}
      </>
    );
};
