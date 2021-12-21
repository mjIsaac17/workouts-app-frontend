import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

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
  }, [dispatch]);

  return (
    <>
      {!users ? (
        <p> Loading...</p>
      ) : (
        <>
          <List>
            {users.map((user, idx) => (
              <>
                <ListItem key={idx}>
                  <ListItemText primary={user.name}></ListItemText>
                  <Button variant="contained">Delete</Button>
                  <Button variant="contained">Edit</Button>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default UserList;
