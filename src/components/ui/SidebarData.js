import { Accessibility, Directions, FitnessCenter } from "@mui/icons-material";
import React from "react";

export const SidebarData = [
  {
    title: "Muscles",
    icon: <Accessibility />,
    link: "/muscles",
  },
  {
    title: "Exercises",
    icon: <FitnessCenter />,
    link: "/exercises",
  },
  {
    title: "My workouts",
    icon: <Directions />,
    link: "/my-workouts",
  },
];
