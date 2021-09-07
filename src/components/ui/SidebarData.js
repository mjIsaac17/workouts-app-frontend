import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/home",
  },
  {
    title: "My workouts",
    icon: <FitnessCenterIcon />,
    link: "/my-workouts",
  },
];
