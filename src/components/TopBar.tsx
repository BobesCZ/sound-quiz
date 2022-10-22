import { Box, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/icon.svg";
import AppContext from "../store/context";

const useStyles = makeStyles((theme) => ({
  logoButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  userButton: {
    display: "flex",
    gap: 8,
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const {
    appState: { userData },
  } = useContext(AppContext);

  const nickName = userData?.nickName;

  return (
    <AppBar position="sticky">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            className={classes.logoButton}
            color="inherit"
            aria-label="homepage"
            component={RouterLink}
            to="/"
            disableRipple
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
            edge="end"
            color="inherit"
            aria-label="homepage"
            component={RouterLink}
            to="/user"
            disableRipple
          >
            <Box className={classes.userButton}>
              <PersonOutlineIcon />
              {nickName && <Typography>{nickName}</Typography>}
            </Box>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
