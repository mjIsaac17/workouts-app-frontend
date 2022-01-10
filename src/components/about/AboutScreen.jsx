import { GitHub, LinkedIn } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const AboutScreen = () => {
  return (
    <div className="container">
      <Typography variant="h4" component="h1" marginY={3}>
        About
      </Typography>
      <p>
        Workouts App is a web application that provides information on exercises
        classified by muscle groups.
      </p>
      <p>
        You can create your own workouts by selecting the exercises you want!!
      </p>
      <br />
      <hr />
      <br />
      <p>This app was made with the following technologies:</p>
      <br />
      <b>Frontend</b>
      <List>
        <ListItem>
          <ListItemText primary="HTML, CSS/SCSS" />
        </ListItem>
        <ListItem>
          <a
            className="link"
            href="https://es.reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="React JS" />
          </a>
        </ListItem>
        <ListItem>
          <a
            className="link"
            href="https://mui.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="Material UI v5.0.2" />
          </a>
        </ListItem>
      </List>
      <b>Backend & Database</b>
      <List>
        <ListItem>
          <ListItemText primary="NodeJS - Express" />
        </ListItem>
        <ListItem>
          <ListItemText primary="SQL server" />
        </ListItem>
      </List>
      <hr />
      <br />
      <b>Author info</b>
      <p>Isaac Montes Jiménez</p>
      <List>
        <ListItem>
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <a
            className="link"
            href="https://github.com/mjIsaac17/workouts-app-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="Github/mjIsaac17" />
          </a>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LinkedIn />
          </ListItemIcon>
          <a
            className="link"
            href="https://www.linkedin.com/in/isaac-montes-a75b85194/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="Linkedin" />
          </a>
        </ListItem>
      </List>
    </div>
  );
};

export default AboutScreen;
