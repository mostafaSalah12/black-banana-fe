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

import image1 from "../../assets/round3/Lastcipher.png";
import image4 from "../../assets/round3/regiuspoem.jpg";

const useStyle = makeStyles((theme) => ({
  playerStyle: {
    marginTop: "32px",
    minWidth: "300px",
    width: "600px",
  },
  imageStyle: {
    minWidth: "300px",
    width: "700px",
    maxHeight: "700px",
    margin: "32px",
  },
  image1Style: {
    minWidth: "300px",
    width: "500px",
    maxHeight: "700px",
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
    if (answer.toUpperCase() === puzzle.round3.q2.answer) {
      firestore
        .collection("teams")
        .doc(puzzle.id)
        .update({
          "round3.currentIndex": 2,
          "round3.q2.solved": true,
          "round3.q2.solvedAt": new Date(),
          activeRound: "Finished",
          status: "Finished",
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
        <img src={image4} className={classes.image1Style} />
      </Grid>
      <Grid item className={classes.descriptionStyle}>
        <Typography>
          The cover of the book has the term “Honi Soit Qui Mal Y Pense”. If we
          research this phrase, we may be able to complete the riddle to find
          the hidden codeword:
        </Typography>
      </Grid>

      <Grid item className={classes.descriptionStyle}>
        <Typography>“Who does a lion befriend?”</Typography>
      </Grid>

      <Grid item>
        <img src={image1} className={classes.imageStyle} />
      </Grid>
      <Grid item>
        <Typography className={classes.resultStyle}>_ _ _ _ _ _ _ </Typography>
      </Grid>

      <Question handleAnswer={handleAnswer} />
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Grid>
  );
}

export default PuzzleTwo;
