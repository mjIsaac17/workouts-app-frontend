import { fetchToken, fetchTokenFormData } from "../helpers/fetch";
import { types } from "../types/types";
import { setModal } from "./modal.action";
import { setSnackbar } from "./snackbar.action";

const workoutEndpoint = "workout";

const successGetMyWorkouts = (workouts) => ({
  type: types.successGetMyWorkouts,
  payload: workouts,
});

export const startGettingMyWorkouts = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`${workoutEndpoint}/my-workouts`);
      const body = await resp.json();
      if (resp.ok) {
        dispatch(successGetMyWorkouts(body));
      } else {
        dispatch(failureAction());
        dispatch(setSnackbar("error", body.error, true));
      }
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

const successGetWorkoutExercises = (exercises) => ({
  type: types.successGetWorkoutExercises,
  payload: exercises,
});

export const startGettingWorkoutExercises = (workoutName) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(
        `${workoutEndpoint}/my-workouts/${workoutName}`
      );
      const body = await resp.json();
      if (resp.ok) {
        dispatch(successGetWorkoutExercises(body));
        return body;
        //dispatch(setCurrentWorkout(workout, body));
      } else {
        dispatch(failureAction());
        dispatch(setSnackbar("error", body.error, true));
        console.log(body.error);
      }
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

export const setCurrentWorkout = (workout) => ({
  type: types.setCurrentWorkout,
  payload: workout,
});

export const startSettingCurrentWorkout = (workout) => {
  return async (dispatch) => {
    try {
      const workoutExercises = await dispatch(
        startGettingWorkoutExercises(workout.name)
      );
      dispatch(setCurrentWorkout({ ...workout, workoutExercises }));
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

const successAddWorkout = (workout) => ({
  type: types.successAddWorkout,
  payload: workout,
});

export const startAddingWorkout = (workout) => {
  return async (dispatch) => {
    try {
      const resp = await fetchTokenFormData(workoutEndpoint, workout, "POST");
      const body = await resp.json();
      if (resp.ok) {
        if (workout.image) {
          workout.imageName = workout.image.name;
          delete workout.image;
        }
        workout.id = body.workoutId;
        dispatch(successAddWorkout(workout));
        dispatch(setSnackbar("success", "Workout added", true));
        dispatch(setModal(false));
      } else dispatch(setSnackbar("error", body.error, true));
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

const successUpdateWorkout = (workout) => ({
  type: types.successUpdateWorkout,
  payload: workout,
});

export const startUpdatingWorkout = (workout) => {
  console.log(workout);
  return async (dispatch) => {
    try {
      const resp = await fetchTokenFormData(
        `${workoutEndpoint}/${workout.id}`,
        workout,
        "PUT"
      );
      const body = await resp.json();
      if (resp.ok) {
        if (workout.image) {
          workout.imageName = workout.image.name;
          delete workout.image;
        }
        dispatch(successUpdateWorkout(workout));
        dispatch(setSnackbar("success", "Workout updated", true));
        dispatch(setModal(false));
      } else dispatch(setSnackbar("error", body.error, true));
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

const failureAction = () => ({
  type: types.failureAction,
});
