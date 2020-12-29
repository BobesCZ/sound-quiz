import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { ReactComponent as Logo } from '../assets/icon.svg';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopBar() {
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

          <Typography variant="h6" className={classes.title}>
            SoundQuiz
          </Typography>

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

export default TopBar;
