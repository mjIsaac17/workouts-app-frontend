import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const ChipsArray = React.memo(
  ({ chips = [], title = "", handleDelete }) => {
    console.log("render ChipsArray");

    return (
      <>
        {!!title && <p>{title}</p>}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chips.map((data) => {
            return (
              <ListItem key={data.key}>
                <Chip label={data.label} onDelete={() => handleDelete(data)} />
              </ListItem>
            );
          })}
        </Paper>
      </>
    );
  }
);
