import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function PlayPauseButton(props) {
  const player = props.player;
  const isPlaying = props.isPlaying;
  const isLoading = props.isLoading;
  const progress = props.progress;
  const startSeconds = props.videoObject.startSeconds;

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
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Box my={3}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Grid>

      <Grid>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {isLoading
            ? <Button variant="outlined" color="primary">
              <CircularProgress size={24} /> Play
            </Button>
            : <Button variant="outlined" color="primary" onClick={handleButtonPlayClick}>
              {isPlaying
                ? <> <PauseIcon /> Pause </>
                : <> <PlayArrowIcon /> Play </>
              }
            </Button>
          }
          <Button variant="outlined" color="primary" onClick={handleButtonReplayClick}>
            <ReplayIcon /> Replay
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default PlayPauseButton;
