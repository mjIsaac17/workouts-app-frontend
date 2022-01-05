import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const ExerciseCard = ({ exercise, onCardClick }) => {
  return (
    <Card className="workout-card" onClick={() => onCardClick(exercise)}>
      <CardActionArea>
        <CardMedia
          className=" workout-card__image"
          component="img"
          image={
            exercise.imageUrl
              ? exercise.imageUrl
              : `${process.env.PUBLIC_URL}/img/defaultWorkout.jpg`
          }
          alt={exercise.imageName ? exercise.imageName : exercise.name}
        />

        <CardContent className="workout-card__text">
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className="workout-card__text-title"
          >
            {exercise.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="workout-card__text-description"
          >
            {exercise.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
