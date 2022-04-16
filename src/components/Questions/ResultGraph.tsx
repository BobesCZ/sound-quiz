import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ResultProgress from "../elements/ResultProgress";

interface ResultGraphProps {
  score: number;
}

const ResultGraph = ({ score }: ResultGraphProps) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    setProgress(score);

    return () => {
      setProgress(0);
    };
  }, [score]);

  return (
    <Box position="relative" display="inline-flex" mb={3}>
      <ResultProgress variant="determinate" value={progress} />
      <ResultProgress variant="static" value={100} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5" component="div" color="textSecondary">
          {`${Math.round(score)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultGraph;
