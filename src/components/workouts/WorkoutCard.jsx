import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { componentsModal } from "../../helpers/componentsModal";
import Image from "../ui/Image";

export const WorkoutCard = ({ workout, onCardClick }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setModal(true, "Update workout", componentsModal.workoutsUpdate));
  };

  const handleDelete = () => {
    dispatch(setModal(true, "Delete workout", componentsModal.workoutsDelete));
  };
  return (
    <Card className="workout-card" onClick={() => onCardClick(workout)}>
      <CardActionArea>
        <Link
          style={{ textDecoration: "none" }}
          to={`workouts/${workout.name}`}
        >
          <Image
            imageUrl={workout.imageUrl}
            defaultImageUrl={`${process.env.PUBLIC_URL}/img/defaultWorkout.jpg`}
            altText={workout.name}
            className="workout-card__image"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="p">
              {workout.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {workout.description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions className="workout-card__buttons">
        <Button
          size="small"
          color="secondary"
          endIcon={<Delete />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          size="small"
          color="primary"
          endIcon={<Edit />}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
