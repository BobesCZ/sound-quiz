import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Question, QuestionId } from "../../types/types";
import loadYtScript from "../../utils/loadScript";
import PlayerPanel from "./PlayerPanel";
import QuestionForm from "./QuestionForm";

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

interface QuestionControlProps {
  questionObject: Question;
  questionId: QuestionId;
  isQuestionChecked: boolean;
}

const QuestionControl = ({
  questionObject,
  questionId,
  isQuestionChecked,
}: QuestionControlProps) => {
  const classes = useStyles();

  const videoObject = questionObject.video;
  const answerInfo = isQuestionChecked ? questionObject.answerInfo : undefined;

  const [playerObject, setPlayerObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playerCheckInterval = 250;
  let player: any;
  let videoEndTimer: ReturnType<typeof setInterval>;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // restart player
    if (playerObject !== null && typeof playerObject === "object") {
      (playerObject as any)?.pauseVideo();
      (playerObject as any)?.destroy();
    }

    if (!(window as any)?.onYouTubeIframeAPIReady) {
      (window as any).onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    return () => {
      clearInterval(videoEndTimer);
      setProgress(0);
      setIsPlaying(false);
    };
  }, [questionId]); // eslint-disable-line

  loadYtScript();

  const createPlayer = () => {
    // @ts-ignore
    player = new YT.Player("player", {
      // eslint-disable-line
      width: "0",
      height: "0",
      videoId: videoObject.id,
      playerVars: {
        start: videoObject.startSeconds,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = () => {
    setPlayerObject(player);
  };

  const onPlayerStateChange = () => {
    // @ts-ignore
    if (player.getPlayerState() === YT.PlayerState.BUFFERING) {
      // eslint-disable-line
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    // @ts-ignore
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      // eslint-disable-line
      setIsPlaying(true);

      videoEndTimer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            return 100;
          }
          const progress =
            ((player.getCurrentTime() - videoObject.startSeconds) /
              ((videoObject.endSeconds ?? 0) - videoObject.startSeconds)) *
            100;
          return Math.min(progress, 100);
        });

        if (player.getCurrentTime() >= (videoObject.endSeconds ?? 0)) {
          player.pauseVideo();
          player.seekTo(videoObject.startSeconds);
          clearInterval(videoEndTimer);
          setProgress(0);
        }
      }, playerCheckInterval);
    } else {
      setIsPlaying(false);
      clearInterval(videoEndTimer);

      if (Math.round(player.getCurrentTime()) === videoObject.startSeconds) {
        setProgress(0);
      }
    }
  };

  return (
    <div>
      <div id="player"></div>

      {!playerObject ? (
        <CircularProgress className={classes.root} />
      ) : (
        <>
          <PlayerPanel
            player={playerObject}
            isPlaying={isPlaying}
            isLoading={isLoading}
            startSeconds={videoObject.startSeconds}
            progress={progress}
            answerInfo={answerInfo}
          />
          <QuestionForm
            questionId={questionId}
            questionObject={questionObject}
          />
        </>
      )}
    </div>
  );
};

export default QuestionControl;
