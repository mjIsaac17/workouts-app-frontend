import { Accessibility, Directions, FitnessCenter } from "@mui/icons-material";
import React from "react";

export const SidebarData = [
  {
    title: "Muscles",
    icon: <Accessibility />,
    link: "/home",
  },
  {
    title: "Exercises",
    icon: <FitnessCenter />,
    link: "/my-workouts",
  },
  {
    title: "My workouts",
    icon: <Directions />,
    link: "/my-workouts",
  },
];
