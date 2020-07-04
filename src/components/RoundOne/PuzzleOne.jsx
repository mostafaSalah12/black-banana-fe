import React, { useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import { PuzzleContext } from "../../providers/PuzzleContext";

import Question from "../Question";
import { firestore } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import image from "../../assets/round1/plaquemessage.jpg";

const useStyle = makeStyles((theme) => ({
  playerStyle: {
    marginTop: "32px",
    minWidth: "300px",
    width: "700px",
  },
  imageStyle: {
    minWidth: "300px",
    width: "700px",
    margin: "32px",
  },
  descriptionStyle: {
    fontSize: "1.2rem",
    alignSelf: "start",
  },
  resultStyle: {
    textAlign: "center",
    marginTop: 16,
  },
}));

function PuzzleOne() {
  const classes = useStyle();
  const { puzzle, setPuzzle } = useContext(PuzzleContext);

  const error = () =>
    toast.error("Invalid Answer", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const success = () =>
    toast.success("Good Job ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const handleAnswer = (e, answer) => {
    e.preventDefault();
    if (
      answer.toUpperCase() === puzzle.round1.q1.answer ||
      answer.toUpperCase() === puzzle.round1.q1.answer2
    ) {
      firestore
        .collection("teams")
        .doc(puzzle.id)
        .update({
          "round1.currentIndex": 1,
          "round1.q1.solved": true,
          "round1.q1.solvedAt": new Date(),
        })
        .then(() => {
          firestore
            .collection("teams")
            .doc(puzzle.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setPuzzle(doc.data());
              }
            });
        })
        .catch(() => {
          error();
        });
    } else {
      error();
    }
  };

  return (
    <Grid
      xs={12}
      md={6}
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <ReactPlayer
          url="https://youtu.be/VVsNO7aBryc"
          className={classes.playerStyle}
        />
      </Grid>
      <Grid item>
        <img src={image} className={classes.imageStyle} />
      </Grid>
      <Grid item className={classes.descriptionStyle}>
        <Typography>
          These were two papers tucked away in Franklin’s desk.
          <br /> The first one is of a building that was important to him.{" "}
          <br />
          The second paper must be the thing that is in the red circle.
          <br /> What is the hidden message?
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.resultStyle}>
          _ _ _ _ _ _ _ _{" "}
        </Typography>
      </Grid>
      <Question handleAnswer={handleAnswer} />
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Grid>
  );
}

export default PuzzleOne;
