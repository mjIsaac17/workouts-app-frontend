import { Search } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { startGettingExercises } from "../../actions/exercise.action";
import { ExerciseItem } from "./ExerciseItem";

export const ExerciseList = () => {
  const { muscleId } = useParams();
  const dispatch = useDispatch();
  console.log("render <ExerciseList/>");

  const { exerciseList, loading } = useSelector((state) => state.exercises);
  const { muscleList } = useSelector((state) => state.muscles);
  const totalExercises = exerciseList.length;

  const handleSelect = () => {
    const id = document.getElementById("ddlMuscle").value;
    dispatch(startGettingExercises(id));
  };

  useEffect(() => {
    console.log("effect startGettingExercises");
    if (muscleId) dispatch(startGettingExercises(muscleId));
  }, [dispatch, muscleId]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="searchArea">
            <select
              id="ddlMuscle" //drop down list
              defaultValue={muscleId}
              onChange={handleSelect}
            >
              <option value="0">All</option>
              {muscleList.map((muscle) => (
                <option key={muscle.id} value={muscle.id}>
                  {muscle.name}
                </option>
              ))}
            </select>
            <div className="inputSearch">
              <input
                type="text"
                className="searchArea__input"
                placeholder="Search"
              />
              <Search></Search>
            </div>
          </div>
          <div className="searchArea resultsText">
            <p>Results:</p>
            <p>{totalExercises > 0 ? totalExercises : 0} Exercise(s) found</p>
          </div>
          <div className="card__list">
            {exerciseList.map((exercise) => (
              <ExerciseItem
                key={exercise.name + exercise.id}
                exercise={exercise}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
