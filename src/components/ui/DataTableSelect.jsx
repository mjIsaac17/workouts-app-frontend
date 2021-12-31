import React, { useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Popover, Typography } from "@mui/material";

const columns = [
  { field: "exerciseName", headerName: "Exercise name", width: 150 },
  { field: "exerciseDescription", headerName: "Description", width: 250 },
];

export const DataTableSelect = React.memo(({ handleAdd }) => {
  // console.log("render <DataTableSelect />");
  const { exerciseList } = useSelector((state) => state.exercises);
  const [hoverExercise, setHoverExercise] = useState({});
  const divRef = useRef();

  const rows = exerciseList.map((ex) => ({
    id: ex.id,
    exerciseName: ex.name,
    exerciseDescription: ex.description,
    imageName: ex.imageName,
    imageUrl: ex.imageUrl,
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (e) => {
    setAnchorEl(divRef.current);
    setHoverExercise({ name: e.row.exerciseName, imageUrl: e.row.imageUrl });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div style={{ height: 275 }}>
        <DataGrid
          ref={divRef}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          onCellClick={handleAdd}
          onCellEnter={handlePopoverOpen}
          onCellLeave={handlePopoverClose}
          density="compact"
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{hoverExercise.name}</Typography>
          <img
            style={{ maxWidth: "150px" }}
            src={hoverExercise.imageUrl}
            alt={hoverExercise.imageName}
          />
        </Popover>
      </div>
    </>
  );
});
