export const types = {
  failureAction: "failureAction",

  //Muscles
  clearMuscles: "clearMuscle",
  failureGetMuscles: "failureGetMuscles",

  setCurrentMuscle: "setCurrentMuscle",

  startAddingMuscle: "startAddingMuscle",
  startUpdatingMuscle: "startUpdatingMuscle",
  startDeletingMuscle: "startDeletingMuscle",

  successAddMuscle: "successAddMuscle",
  successGetMuscles: "successGetMuscles",
  successUpdateMuscle: "successUpdateMuscle",
  successRemoveMuscle: "successRemoveMuscle",

  //Exercises
  startGettingExercises: "startGettingExercises",
  successGetExercises: "successGetExercises",
  failureGetExercises: "failureGetExercises",
  clearExercises: "clearExercises",
  successAddExercise: "successAddExercise",
  failureAddExercise: "failureAddExercise",
  setCurrentExercise: "setCurrentExercise",

  successUpdateExercise: "successUpdateExercise",
  successRemoveExercise: "successRemoveExercise",
  failureUpdateExercise: "failureUpdateExercise",
  successDeleteExercise: "successDeleteExercise",

  //User/Login
  startRegister: "stateRegister",

  startLogin: "startLogin",
  successLogin: "successLogin",
  // failureLogin: "failureLogin",
  finishRenewToken: "finishRenewToken",
  clearUser: "clearUser",
  logout: "logout",

  //Workouts
  startGettingMyWorkouts: "startGettingMyWorkouts",
  successGetMyWorkouts: "successGetMyWorkouts",
  startAddingWorkout: "startAddingWorkout",
  successAddWorkout: "successAddWorkout",
  startGettingWorkoutExercises: "startGettingWorkoutExercises",
  successGetWorkoutExercises: "successGetWorkoutExercises",
  setCurrentWorkout: "setCurrentWorkout",
  startUpdatingWorkout: "startUpdatingWorkout",

  //UI
  setSnackbar: "setSnackbar",
  setModal: "setModal",
};
