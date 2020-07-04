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
  firstParagraph: {
    marginTop: "64px",
  },
  secondParagraph: {
    marginTop: "32px",
  },
  thiredParagraph: {
    marginTop: "32px",
  },
  fouthParagraph: {
    marginTop: "64px",
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

function PuzzleFive() {
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
    if (answer.toUpperCase() === puzzle.round1.q5.answer) {
      firestore
        .collection("teams")
        .doc(puzzle.id)
        .update({
          "round1.currentIndex": 5,
          "round1.q5.solved": true,
          "round1.q5.solvedAt": new Date(),
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
      <Grid item className={classes.descriptionStyle}>
        <Typography className={classes.firstParagraph}>
          May 12. 1784. <br />
          Sir,
        </Typography>
        <Typography className={classes.secondParagraph}>
          I received your kid Letter with your excellent dvice to the People of
          the United States, which I read with great Pleasure, and hope it will
          be duly regarded. Such Writings though they ay be lightly passed ovr
          by many Readers, the effects may be considerable. Permit me to indly
          mention one lttle instance, which though it relaes to myself, will not
          be quite unintresting to you. Whn I was a boy, I ecitedly met with a
          book entitled Essays to do Good, which I think was written by your
          Father. It had been so little regarded by a former possessor, that
          several leaves of it were torn out: but the remainder gave me such a
          ositive turn of thinking as to have an influnce on my conduct through
          life; for I have always set a geater value on the character of a doer
          of good, than on any other kind of reputation; and if I have been, as
          you seem to think, a useful citizen, the public owes the advantage of
          it to that book. You ention your being in your 78th yar. I am in my
          79th year. We are grown old together. It is now more than 60 years
          since I left Bosto, but I remember well both your Faher and
          Grandfather having heard them both in the pulpit, and seen them in
          their houses. He was a man that never reected any occasion of giving
          instruction, and upon this he said to me, You re young and have the
          world before you; stoop as you go through it, and you will miss many
          hard thumps. Bitain has not yet well digested the loss of its dominion
          over us, and has still at times some flattering hopes of recovering
          it. Let us preserve our reputation by performing our engagements, our
          credit by fulfilling our contracts, and our friends by gratitude &
          kindness; for we know not how soon we may again have occasion for all
          of them.
        </Typography>
        <Typography className={classes.thiredParagraph}>
          With great and sincere esteem,
          <br />
          I have the honour to be,
          <br />
          Reverend Sir,
          <br />
          Your most obedient & most humble servant Ben Franklin
        </Typography>
        <Typography className={classes.fouthParagraph}>
          Something's missing…
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.resultStyle}>_ _ _ _ _ _</Typography>
      </Grid>

      <Question handleAnswer={handleAnswer} />
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Grid>
  );
}

export default PuzzleFive;
