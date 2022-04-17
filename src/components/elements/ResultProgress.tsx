import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { grey } from "@material-ui/core/colors";
import { StyleRules, withStyles } from "@material-ui/core/styles";

const styles: StyleRules = {
  static: {
    position: "absolute",
    zIndex: -1,
    color: grey[600],
    opacity: 0.3,
  },
  circle: {
    transitionDuration: "1s",
  },
};

const ClassNames = (props: CircularProgressProps) => (
  <CircularProgress size={150} {...props} />
);

export default withStyles(styles)(ClassNames);
