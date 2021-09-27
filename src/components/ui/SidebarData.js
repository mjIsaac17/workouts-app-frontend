import React from "react";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { DirectionsRun } from "@material-ui/icons";

export const SidebarData = [
  {
    title: "Muscles",
    icon: <AccessibilityIcon />,
    link: "/home",
  },
  {
    title: "Exercises",
    icon: <FitnessCenterIcon />,
    link: "/my-workouts",
  },
  {
    title: "My workouts",
    icon: <DirectionsRun />,
    link: "/my-workouts",
  },
];
