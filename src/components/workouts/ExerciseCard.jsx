import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const ExerciseCard = ({ exercise }) => {
  return (
    <Card sx={{ width: 320, margin: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`/img/exercises/${
            exercise.imageName ? exercise.imageName : "default.jpg"
          }`}
          alt={exercise.imageName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {exercise.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {exercise.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
