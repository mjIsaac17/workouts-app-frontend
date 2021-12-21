import React from "react";
import { Link } from "react-router-dom";
import { UserSidebarData, AdminSidebarData } from "./SidebarData";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const Sidebar = ({ openSidebar, openCloseSidebar }) => {
  console.log("render sidebar");

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Drawer open={openSidebar} onClose={openCloseSidebar}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={openCloseSidebar}
          onKeyDown={openCloseSidebar}
        >
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h5">WorkoutsApp</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            {UserSidebarData.map((data, index) => (
              <Link to={data.link} key={index}>
                <ListItem button>
                  <ListItemIcon>{data.icon}</ListItemIcon>
                  <ListItemText primary={data.title} />
                </ListItem>
              </Link>
            ))}
            {user.isAdmin && (
              <>
                {" "}
                <Divider />
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6">Management</Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
                {AdminSidebarData.map((data, index) => (
                  <Link to={data.link} key={index}>
                    <ListItem button>
                      <ListItemIcon>{data.icon}</ListItemIcon>
                      <ListItemText primary={data.title} />
                    </ListItem>
                  </Link>
                ))}
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
