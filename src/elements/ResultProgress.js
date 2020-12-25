import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  static: {
    position: "absolute",
    zIndex: -1,
    color: grey[600],
    opacity: 0.3,
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
