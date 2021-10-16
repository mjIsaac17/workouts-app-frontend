import React from "react";
import { Link } from "react-router-dom";

import { SidebarData } from "./SidebarData";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export const Sidebar = ({ openSidebar, openCloseSidebar }) => {
  console.log("render sidebar");

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
            {SidebarData.map((data, index) => (
              <Link to={data.link}>
                <ListItem button key={index}>
                  <ListItemIcon>{data.icon}</ListItemIcon>
                  <ListItemText primary={data.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};
