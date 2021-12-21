import {
  Accessibility,
  Directions,
  FitnessCenter,
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
];

export const AdminSidebarData = [
  {
    title: "Users",
    icon: <SupervisedUserCircle />,
    link: "/users",
  },
];
