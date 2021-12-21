import { Typography } from "@mui/material";
import UserList from "./UserList";

const UserScreen = () => {
  console.log("Render <UserScreen />");
  return (
    <>
      <Typography variant="h4" textAlign="center" marginY={3}>
        Manage users
      </Typography>
      <UserList />
    </>
  );
};

export default UserScreen;
