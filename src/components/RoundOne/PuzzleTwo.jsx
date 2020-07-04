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

import image from "../../assets/round1/smokeandmirrors.jpg";

const useStyle = makeStyles((theme) => ({
  playerStyle: {
    marginTop: "32px",
    minWidth: "300px",
    width: "600px",
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

function PuzzleTwo() {
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
    if (answer.toUpperCase() === puzzle.round1.q2.answer) {
      firestore
        .collection("teams")
        .doc(puzzle.id)
        .update({
          "round1.currentIndex": 2,
          "round1.q2.solved": true,
          "round1.q2.solvedAt": new Date(),
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
          url="https://youtu.be/dS_n7-x3_K0"
          className={classes.playerStyle}
          width={"700px"}
        />
      </Grid>
      <Grid item className={classes.descriptionStyle}>
        <Typography>
          We sent a drone back in time to observe a moment during the War! See
          if you can use the footage to decipher the letter below.
        </Typography>
      </Grid>
      <Grid item>
        <img src={image} className={classes.imageStyle} />
      </Grid>
      <Grid item>
        <Typography className={classes.resultStyle}>_ _ _ _ _ _ _</Typography>
      </Grid>

      <Question handleAnswer={handleAnswer} />
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Grid>
  );
}

export default PuzzleTwo;
