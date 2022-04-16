import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { ReactComponent as Logo } from "../assets/icon.svg";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="homepage"
            component={RouterLink}
            to="/"
          >
            <Logo className="MuiSvgIcon-root" />
          </IconButton>

          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            className={classes.title}
            variant="h6"
            underline="none"
          >
            SoundQuiz
          </Link>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="homepage"
            component={RouterLink}
            to="/user"
          >
            <PersonOutlineIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
