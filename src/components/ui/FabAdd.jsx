import Fab from "@mui/material/Fab";
import Add from "@mui/icons-material/Add";

const FabAdd = ({ onClickFunction }) => {
  return (
    <Fab
      onClick={onClickFunction}
      sx={{
        position: "fixed",
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
      }}
      color="primary"
      aria-label="add"
    >
      <Add />
    </Fab>
  );
};

export default FabAdd;
