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
import image2 from "../../assets/round3/masonicmap.jpg";
import image3 from "../../assets/round3/masonicstar.jpg";
import image4 from "../../assets/round3/regiuspoem.jpg";
import image5 from "../../assets/round3/rippedletter.jpg";

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
  firstDescriptionStyle: {
    marginTop: 64,
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
    if (answer.toUpperCase() === puzzle.round3.q1.answer) {
      firestore
        .collection("teams")
        .doc(puzzle.id)
        .update({
          "round3.currentIndex": 1,
          "round3.q1.solved": true,
          "round3.q1.solvedAt": new Date(),
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
      <Grid item className={classes.firstDescriptionStyle}>
        <Typography>
          We have analysed the ciphers you solved and we think we may be close
          to fixing this! We’ll need to figure out the key word:
        </Typography>
      </Grid>
      <Grid item>
        <img src={image1} className={classes.imageStyle} />
      </Grid>
      <Grid item className={classes.descriptionStyle}>
        <Typography>
          We believe you can use the following materials to figure out the
          keyword.
        </Typography>
      </Grid>

      <Grid item className={classes.descriptionStyle}>
        <Typography>
          This is a letter from Franklin to one of his Masonic brethren. The
          letter was torn to bits! We do not know the order of the pieces on the
          right and where they fit with the pieces on the left. Knowing the
          order may help determine Franklin’s path.
        </Typography>
      </Grid>

      <Grid item>
        <img src={image5} className={classes.imageStyle} />
      </Grid>

      <Grid item className={classes.descriptionStyle}>
        <Typography>
          With the order of the letter in place, we can track Franklin’s path...
        </Typography>
      </Grid>
      <Grid item>
        <img src={image2} className={classes.imageStyle} />
      </Grid>

      <Grid item>
        <img src={image3} className={classes.imageStyle} />
      </Grid>

      <Grid item>
        <Typography>
          “May the White Point always face West,” he says. There is something
          Ben and his Masonic brothers hold very sacred.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>_ _ _ _ _ _ Poem</Typography>
      </Grid>

      <Question handleAnswer={handleAnswer} />
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Grid>
  );
}

export default PuzzleOne;
