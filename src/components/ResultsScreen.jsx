import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ReactPlayer from "react-player";
import { PuzzleContext } from "../providers/PuzzleContext";

function ResultsScreen() {
  const { puzzle } = useContext(PuzzleContext);
  const calculateScore = () => {
    if (puzzle) {
      if (
        !puzzle.round1.q1.solved ||
        !puzzle.round1.q2.solved ||
        !puzzle.round1.q3.solved ||
        !puzzle.round1.q4.solved ||
        !puzzle.round1.q5.solved ||
        !puzzle.round1.q6.solved ||
        !puzzle.round1.q7.solved ||
        !puzzle.round3.q1.solved ||
        !puzzle.round3.q2.solved
      ) {
        return (
          <Grid Item>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=UksvS8tswSA&feature=youtu.be"
              width={"800px"}
              height={"500px"}
              playing
            />
          </Grid>
        );
      } else {
        return (
          <Grid Item>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=o7pnh2CyFqk&feature=youtu.be"
              width={"800px"}
              height={"500px"}
              playing
            />
          </Grid>
        );
      }
    }
  };
  return <Grid Item>{calculateScore()}</Grid>;
}

export default ResultsScreen;
