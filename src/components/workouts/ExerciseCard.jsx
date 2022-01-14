import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Image from "../ui/Image";

export const ExerciseCard = ({ exercise, onCardClick }) => {
  return (
    <Card className="workout-card" onClick={() => onCardClick(exercise)}>
      <CardActionArea>
        <Image
          imageUrl={exercise.imageUrl}
          defaultImageUrl={`${process.env.PUBLIC_URL}/img/default.jpg`}
          altText={exercise.name}
          className=" workout-card__image"
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
