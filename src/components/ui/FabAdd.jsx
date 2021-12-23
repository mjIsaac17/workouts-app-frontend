import Fab from "@mui/material/Fab";
import Add from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

const FabAdd = ({ onClickFunction, tooltipText = "Add" }) => {
  return (
    <Tooltip title={tooltipText}>
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
    </Tooltip>
  );
};

export default FabAdd;
