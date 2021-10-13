import React, { memo, useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useDispatch } from "react-redux";
import { startGettingExercises } from "../../actions/exercise.action";

export const VerticalTabs = memo(({ muscleList }) => {
  console.log("render <VerticalTabs>");
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("effect startGettingExercises", value);
    if (value === 0) dispatch(startGettingExercises(0));
    else dispatch(startGettingExercises(muscleList[value - 1].id));
  }, [dispatch, value, muscleList]);

  return (
    <Tabs
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: "divider" }}
    >
      <Tab key="tab-all" label="All" />
      {muscleList.map((muscle, index) => (
        <Tab key={`tab-${muscle.name}`} label={muscle.name} />
      ))}
    </Tabs>
  );
});
