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

export const MusclesList = () => {
  const dispatch = useDispatch();

  const { muscleList, loading } = useSelector((state) => state.muscles);
  const { isAdmin } = useSelector((state) => state.user.user);
  const modalState = useSelector((state) => state.modal);
  const [editMode, setEditMode] = useState(false);

  console.log("render <musclesList/>");

  useEffect(() => {
    dispatch(startGettingMuscles());
    console.log("effect startgettingMuscles");
  }, [dispatch]);

  useEffect(() => {
    console.log("effect saveMuscleList");
    if (muscleList.length > 0)
      localStorage.setItem("muscleList", JSON.stringify(muscleList));
  }, [muscleList]);

  const handleEditMode = () => {
    setEditMode(!editMode);
    dispatch(setSnackbar("info", "Select a muscle to edit it", !editMode));
  };
  //set current muscle in the state
  const handleMuscleClick = (currentMuscle) => {
    dispatch(setCurrentMuscle(currentMuscle));
    dispatch(setModal(true, "Edit muscle", componentsModal.muscleItem));
  };

  if (loading) return <h1>Loading...</h1>;
  else
    return (
      <div>
        <div className="card__list">
          {muscleList.map((muscle) =>
            !editMode ? (
              <MuscleItem key={muscle.id} muscle={muscle} editMode={editMode} />
            ) : (
              <div key={muscle.id} onClick={() => handleMuscleClick(muscle)}>
                <MuscleItem muscle={muscle} editMode={editMode} />
              </div>
            )
          )}
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
            <Fab
              color={!editMode ? "secondary" : ""}
              aria-label="edit"
              onClick={handleEditMode}
            >
              {!editMode ? <Edit /> : <Close />}
            </Fab>
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
          </Stack>
        )}

        {modalState.componentName === componentsModal.muscleList && (
          <Modal>
            <AddMuscle />
          </Modal>
        )}
        {modalState.componentName === componentsModal.muscleItem && (
          <Modal>
            <MuscleDetails />
          </Modal>
        )}
      </div>
    );
};
