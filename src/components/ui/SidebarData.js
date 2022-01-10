import {
  Accessibility,
  Directions,
  FitnessCenter,
  Info,
  SupervisedUserCircle,
} from "@mui/icons-material";
import React from "react";

export const UserSidebarData = [
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
    title: "Workouts",
    icon: <Directions />,
    link: "/workouts",
  },
  {
    title: "About",
    icon: <Info />,
    link: "/about",
  },
];

export const AdminSidebarData = [
  {
    title: "Users",
    icon: <SupervisedUserCircle />,
    link: "/users",
  },
];
