import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { startGettingUsers } from "../../actions/user.action";

const UserList = () => {
  console.log("Render <UserList />");

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    if (!users) {
      console.log("Effect getUsers");
      dispatch(startGettingUsers());
    }
  }, [dispatch, users]);

  return (
    <>
      {!users ? (
        <p> Loading...</p>
      ) : (
        <>
          <List sx={{ maxWidth: "1300px", width: "95%", margin: "0 auto" }}>
            {users.map((user, idx) => (
              <div key={idx}>
                <ListItem>
                  <ListItemText
                    primary={`${user.name} ${user.lastname}`}
                  ></ListItemText>
                  <IconButton
                    aria-label="delete-user"
                    variant="contained"
                    color="secondary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete-user"
                    variant="contained"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default UserList;
