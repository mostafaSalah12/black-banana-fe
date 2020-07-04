import React, { useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import { firestore } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { PuzzleContext } from "../../providers/PuzzleContext";

import Question from "../Question";

import image from "../../assets/round1/lensesboard.jpg";

const useStyle = makeStyles((theme) => ({
  titleStyle: {
    fontWeight: "700",
    margin: "18px",
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

function PuzzleSix() {
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
      answer.toUpperCase() === puzzle.round1.q6.answer ||
      answer.toUpperCase() === puzzle.round1.q6.answer2
    ) {
      firestore
        .collection("teams")
        .doc(puzzle.id)
        .update({
          "round1.currentIndex": 6,
          "round1.q6.solved": true,
          "round1.q6.solvedAt": new Date(),
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
        <img src={image} className={classes.imageStyle} />
      </Grid>
      <Grid item className={classes.descriptionStyle}>
        <Typography>
          “56 men”, but this contraption looks to be highlighting a single one
          in yellow.
          <br />
          This was used to lay over the top of an important document to reveal
          the name of someone specific.
          <br /> Possibly the man who helped Ben Franklin write coded messages
          to help win the US independence.
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.resultStyle}>
          _ _ _ _ _ _ _ _ _
        </Typography>
      </Grid>

      <Question handleAnswer={handleAnswer} />
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Grid>
  );
}

export default PuzzleSix;
