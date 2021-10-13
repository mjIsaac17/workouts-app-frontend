import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { componentsModal } from "../../helpers/componentsModal";

export const WorkoutCard = ({ workout }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setModal(true, "Update workout", componentsModal.workoutsUpdate));
  };

  const handleDelete = () => {
    dispatch(setModal(true, "Delete workout", componentsModal.workoutsDelete));
  };
  return (
    <Card sx={{ width: 320, margin: "1rem" }}>
      <CardActionArea>
        <Link
          style={{ textDecoration: "none" }}
          to={`workouts/${workout.name}`}
        >
          <CardMedia
            component="img"
            height="300"
            image={`/img/workouts/${
              workout.imageName ? workout.imageName : "default.jpg"
            }`}
            alt={workout.imageName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {workout.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {workout.description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
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
