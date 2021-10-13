import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGettingMyWorkouts,
  startSettingCurrentWorkout,
} from "../../actions/workout.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { WorkoutAdd } from "./WorkoutAdd";
import { WorkoutCard } from "./WorkoutCard";

export const WorkoutList = () => {
  const dispatch = useDispatch();
  const { myWorkouts, loading } = useSelector((state) => state.workouts);
  const { componentName } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(startGettingMyWorkouts());
  }, [dispatch]);

  const handleSelectWorkout = (workout) => {
    dispatch(startSettingCurrentWorkout(workout));
  };

  if (loading) return <h2>Loading...</h2>;
  return (
    <div className="card__list">
      {myWorkouts.map((workout) => (
        <div key={workout.id} onClick={() => handleSelectWorkout(workout)}>
          <WorkoutCard key={workout.id} workout={workout} />
        </div>
      ))}
      {componentName === componentsModal.workoutsUpdate && (
        <Modal>
          <WorkoutAdd action={"update"} />
        </Modal>
      )}
    </div>
  );
};
