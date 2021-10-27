import { Delete } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React from "react";

export const ConfirmDelete = ({ children, handleDelete, handleCancel }) => {
  return (
    <>
      {children}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        className="m-t--2"
      >
        <Button variant="contained" color="info" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<Delete />}
          color="error"
          onClick={handleDelete}
        >
          Accept
        </Button>
      </Stack>
    </>
  );
};
