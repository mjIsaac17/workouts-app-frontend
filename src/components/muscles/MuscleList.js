import { Add } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { startGettingMuscles } from "../../actions/muscles.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { MuscleItem } from "./MuscleItem";

export const MusclesList = () => {
  const dispatch = useDispatch();

  const { muscleList, loading } = useSelector((state) => state.muscles);
  const modalState = useSelector((state) => state.modal);

  console.log("render musclesList");

  useEffect(() => {
    dispatch(startGettingMuscles());
    console.log("effect startgettingMuscles");
  }, [dispatch]);

  useEffect(() => {
    console.log("effect saveMuscleList");
    if (muscleList.length > 0)
      localStorage.setItem("muscleList", JSON.stringify(muscleList));
  }, [muscleList]);

  if (loading) return <h1>Loading...</h1>;
  else
    return (
      <div>
        <div className="card__list">
          {muscleList.map((muscle) => (
            <MuscleItem key={muscle.id} muscle={muscle} />
          ))}
        </div>
        <button
          type="button"
          className="fab fab-primary"
          onClick={() =>
            dispatch(
              setModal(true, "Add new muscle", componentsModal.muscleList)
            )
          }
        >
          <Add />
        </button>
        {modalState.componentName === componentsModal.muscleList && (
          <Modal>
            <h3>child component</h3>
          </Modal>
        )}
      </div>
    );
};
