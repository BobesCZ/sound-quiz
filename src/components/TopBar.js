import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Logo className="MuiSvgIcon-root" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Music styles
          </Typography>

          {/* <ButtonGroup color="inherit" size="small" aria-label="button group">
            <Button>
              <CheckIcon fontSize="small" />
              <Typography variant="button">
                4
                </Typography>
            </Button>

            <Button>
              <CloseIcon fontSize="small" />
              <Typography variant="button">
                0
                </Typography>
            </Button>
          </ButtonGroup> */}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar;
