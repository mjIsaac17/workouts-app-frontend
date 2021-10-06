import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const MuscleItem = ({ muscle, editMode = false }) => {
  return (
    // <Stack direction="row">
    //   <div className="card">
    //     <Link to={`/exercises/${muscle.id}`}>
    //       <img src={`img/muscles/${muscle.imageName}`} alt={muscle.name} />
    //       <div className="card__title">
    //         <p>{muscle.name}</p>
    //       </div>
    //     </Link>
    //   </div>
    //   <Stack
    //     sx={{
    //       margin: 1,
    //     }}
    //     spacing={1}
    //     direction="column"
    //   >
    //     <IconButton variant="contained" color="primary">
    //       <Edit />
    //     </IconButton>
    //     <IconButton variant="contained" color="secondary">
    //       <Delete />
    //     </IconButton>
    //   </Stack>
    // </Stack>
    <div className="card">
      {!editMode ? (
        <Link to={`/exercises/${muscle.id}`}>
          <img src={`img/muscles/${muscle.imageName}`} alt={muscle.name} />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </Link>
      ) : (
        <>
          <img src={`img/muscles/${muscle.imageName}`} alt={muscle.name} />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </>
      )}
    </div>
  );
};
