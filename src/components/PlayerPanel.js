import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import AlbumIcon from '@material-ui/icons/Album';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme) => ({
  playerArea: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    backgroundColor: grey[800],
  },
  controlsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexGrow: 1,
  },
  progressBox: {
    width: "100%",
    flexGrow: 1,
  },
  imageIconWrap: {
    backgroundColor: grey[600],
    opacity: 0.3,
    marginRight: theme.spacing(1),
  },
  imageIcon: {
    fontSize: 80,
    color: grey[200],
  },
  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    flexGrow: 1,
  }
}));

function PlayerPanel(props) {
  const player = props.player;
  const isPlaying = props.isPlaying;
  const isLoading = props.isLoading;
  const progress = props.progress;
  const startSeconds = props.videoObject.startSeconds;
  const classes = useStyles();

  function handleButtonPlayClick(event) {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) { // eslint-disable-line
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function handleButtonReplayClick(event) {
    player.seekTo(startSeconds);
    player.playVideo();
  }

  return (
    <Box p={1} className={classes.playerArea}>
      <Box mb={2} className={classes.controlsBox}>
        <Box p={1} className={classes.imageIconWrap}>
          <AlbumIcon className={classes.imageIcon} />
        </Box>

        <Box className={classes.buttonsWrap}>
          <ButtonGroup color="primary" aria-label="player buttons">
            {isLoading
              ? <Button
                variant="outlined"
                color="primary"
                startIcon={<CircularProgress size={24} />}
              >
                Play
              </Button>
              : <Button
                variant="outlined"
                color="primary"
                onClick={handleButtonPlayClick}
                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
            }
            <Button
              variant="outlined"
              color="primary"
              onClick={handleButtonReplayClick}
              startIcon={<ReplayIcon />}
            >
              Replay
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      <Box mb={1} className={classes.progressBox}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
}

export default PlayerPanel;
