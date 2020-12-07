import React, { useState } from 'react';
import loadYtScript from '../utils/loadYtScript';
import PlayerControlPanel from './PlayerControlPanel';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from '@material-ui/core/Container';

function QuestionComponent() {
  const videoObject = {
    id: 'b1RKaRgVFKk',
    startSeconds: 10,
    endSeconds: 20,
  };

  const [playerObject, setPlayerObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playerCheckInterval = 250;
  let player;
  let videoEndTimer;

  const [progress, setProgress] = useState(0);

  loadYtScript();

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', { // eslint-disable-line
      width: '0',
      height: '0',
      videoId: videoObject.id,
      playerVars: {
        start: videoObject.startSeconds,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      }
    });
  }

  function onPlayerReady(event) {
    player.setVolume(20);
    setPlayerObject(player);
  }

  function onPlayerStateChange(event) {
    if (player.getPlayerState() === YT.PlayerState.BUFFERING) { // eslint-disable-line
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (player.getPlayerState() === YT.PlayerState.PLAYING) { // eslint-disable-line
      setIsPlaying(true);

      videoEndTimer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            return 100;
          }
          const progress = (player.getCurrentTime() - videoObject.startSeconds) / (videoObject.endSeconds - videoObject.startSeconds) * 100;
          return Math.min(progress, 100);
        });

        if (player.getCurrentTime() >= videoObject.endSeconds) {
          player.pauseVideo();
          player.seekTo(videoObject.startSeconds);
          clearInterval(videoEndTimer);
          setProgress(0);
        }
      }, playerCheckInterval)
    } else {
      setIsPlaying(false);
      clearInterval(videoEndTimer);

      if (Math.round(player.getCurrentTime()) === videoObject.startSeconds) {
        setProgress(0);
      }
    }
  }

  return (
    <Container maxWidth="sm">

      <div id="player"></div>

      {!playerObject
        ? <CircularProgress />
        : <PlayerControlPanel player={playerObject} isPlaying={isPlaying} isLoading={isLoading} videoObject={videoObject} progress={progress} />
      }

    </Container>

  );
}

export default QuestionComponent;
