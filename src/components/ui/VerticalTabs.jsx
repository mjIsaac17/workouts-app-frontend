import { memo, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";

export const VerticalTabs = memo(
  ({ muscleList, handleChange, removeCurrentMuscle = false }) => {
    // console.log("render <VerticalTabs>");
    const [value, setValue] = useState(0);
    const { current } = useSelector((state) => state.muscles);

    const handleClick = (event, newValue) => {
      setValue(newValue);
      handleChange(newValue);
    };

    return (
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleClick}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab key="tab-all" label="All" value={0} />
        {!removeCurrentMuscle
          ? muscleList.map((muscle) => (
              <Tab
                key={`tab-${muscle.name}`}
                value={muscle.id}
                label={muscle.name}
              />
            ))
          : muscleList.map(
              (muscle) =>
                muscle.id !== current.id && (
                  <Tab
                    key={`tab-${muscle.name}`}
                    value={muscle.id}
                    label={muscle.name}
                  />
                )
            )}
      </Tabs>
    );
  }
);
