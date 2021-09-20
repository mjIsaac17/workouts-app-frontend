import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { startGettingExercises } from "../../actions/exercise.action";
import { ExerciseItem } from "./ExerciseItem";

export const ExerciseList = () => {
  const currentEmpty = {
    id: 0,
    name: "",
  };
  const dispatch = useDispatch();
  //   const id = useSelector((state) => state.muscles.current?.id) || 0;
  const current = useSelector((state) => state.muscles.current) || currentEmpty;
  const { id, name } = current;

  const { exerciseList, loading } = useSelector((state) => state.exercises);

  useEffect(() => {
    console.log("effect startGettingExercises");

    dispatch(startGettingExercises(id));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <p>{name} Exercises:</p>
          <div className="card__list">
            {exerciseList.map((exercise) => (
              <ExerciseItem
                key={exercise.name + exercise.id}
                exercise={exercise}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
