import CircularProgress from '@material-ui/core/CircularProgress';
import { green, grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: green[500],
  },
  static: {
    position: "absolute",
    zIndex: -1,
    color: grey[200]
  },
  circle: {
    transitionDuration: '1s',
  }
};

function ClassNames(props) {
  return (
    <CircularProgress size={150} {...props} />
  );
}

export default withStyles(styles)(ClassNames);
