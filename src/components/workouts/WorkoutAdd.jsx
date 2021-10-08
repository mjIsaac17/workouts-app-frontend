import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import React from "react";
// import { ChipsArray } from "../ui/ChipArray";
import { VerticalTabs } from "../ui/VerticalTabs";
import { DataTableSelect } from "../ui/DataTableSelect";

export const WorkoutAdd = () => {
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));
  console.log("render <WorkoutsAdd />");

  return (
    <div>
      <Stack component="form" spacing={2}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="workoutName">Workout name</InputLabel>
          <Input id="workoutName" aria-describedby="workout-name" />
          <FormHelperText id="my-helper-text">
            Enter a name that describe your workout
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="workoutDescription">Description</InputLabel>
          <Input
            id="workoutDescription"
            aria-describedby="workout-description"
            multiline
            rows={2}
          />
        </FormControl>
        <div>
          <VerticalTabs muscleList={muscleList} />
          <DataTableSelect />
        </div>
      </Stack>
    </div>
  );
};
