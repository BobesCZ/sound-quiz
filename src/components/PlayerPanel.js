import { useState } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    backgroundColor: grey[700],
    marginRight: theme.spacing(1),
    lineHeight: 0,
    minWidth: 80 + 2 * theme.spacing(1),
    minHeight: 80 + 2 * theme.spacing(1),
  },
  imageIcon: {
    fontSize: 80,
    opacity: 0.3,
    color: grey[200],
    margin: theme.spacing(1)
  },
  imageTag: {
    maxWidth: 80 + 2 * theme.spacing(1),
    maxHeight: 80 + 2 * theme.spacing(1),
    opacity: 0,
  },
  imageTagLoaded: {
    opacity: 1,
    transition: ".4s ease opacity",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
    flexGrow: 1,
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
  const answerInfo = props.answerInfo;
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

  const [imageLoaded, setImageLoaded] = useState(false);
  function handleImageLoad(event) {
    setImageLoaded(true);
  }

  return (
    <Box p={1} className={classes.playerArea}>
      <Box mb={2} className={classes.controlsBox}>
        <Box className={classes.imageIconWrap}>
          {answerInfo
            ? <img src={answerInfo.imgUrl} alt="album cover" className={clsx(classes.imageTag, imageLoaded ? classes.imageTagLoaded : null)} onLoad={handleImageLoad} />
            : <AlbumIcon className={classes.imageIcon} />
          }
        </Box>

        <Box className={classes.rightColumn}>
          <Box ml={1} mb={2}>
            <Typography color="textSecondary" variant="body1" noWrap>
              {answerInfo ? answerInfo.songName : '\u00A0'}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {answerInfo ? answerInfo.albumName : '\u00A0'}
            </Typography>
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
      </Box>

      <Box mb={1} className={classes.progressBox}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
}

export default PlayerPanel;
