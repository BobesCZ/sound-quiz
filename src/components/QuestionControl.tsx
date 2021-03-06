import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import loadYtScript from '../utils/loadYtScript';
import PlayerPanel from './PlayerPanel';
import QuestionForm from './QuestionForm';
import { AppState } from '../types/appState';
import { Question } from '../types/question';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    bottom: "50%",
    left: "50%",
    right: "50%",
    margin: -20,
  },
}));

export default function QuestionControl(
  {appState, questionsArray, questionId, isQuestionChecked}: 
  {appState: AppState, questionsArray: Question[], questionId: number, isQuestionChecked: boolean}
  ) {
  const questionObject = questionsArray[questionId];
  const videoObject = questionObject.video;
  const answerInfo = isQuestionChecked ? questionObject.answerInfo : null;

  const [playerObject, setPlayerObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playerCheckInterval = 250;
  let player: any;
  let videoEndTimer: ReturnType<typeof setInterval>;

  const [progress, setProgress] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    // restart player
    if (playerObject !== null && typeof playerObject === "object") {
      (playerObject as any)?.pauseVideo();
      (playerObject as any)?.destroy();
    }

    if (!(window as any)?.onYouTubeIframeAPIReady) {
      (window as any).onYouTubeIframeAPIReady = function () {
        createPlayer();
      }
    }
    else {
      createPlayer();
    }

    return () => {
      clearInterval(videoEndTimer);
      setProgress(0);
      setIsPlaying(false);
    };
  }, [questionId]); // eslint-disable-line 

  loadYtScript();

  function createPlayer() {
    // @ts-ignore
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

  function onPlayerReady() {
    setPlayerObject(player);
  }

  function onPlayerStateChange() {
    // @ts-ignore
    if (player.getPlayerState() === YT.PlayerState.BUFFERING) { // eslint-disable-line
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    // @ts-ignore
    if (player.getPlayerState() === YT.PlayerState.PLAYING) { // eslint-disable-line
      setIsPlaying(true);

      videoEndTimer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            return 100;
          }
          const progress = (player.getCurrentTime() - videoObject.startSeconds) / ((videoObject.endSeconds ?? 0) - videoObject.startSeconds) * 100;
          return Math.min(progress, 100);
        });

        if (player.getCurrentTime() >= (videoObject.endSeconds ?? 0)) {
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
    <div>
      <div id="player"></div>

      {!playerObject
        ? <CircularProgress className={classes.root} />
        : <>
          <PlayerPanel player={playerObject} isPlaying={isPlaying} isLoading={isLoading} videoObject={videoObject} progress={progress} answerInfo={answerInfo} />
          <QuestionForm appState={appState} questionId={questionId} questionObject={questionObject} />
        </>
      }
    </div>
  );
}
