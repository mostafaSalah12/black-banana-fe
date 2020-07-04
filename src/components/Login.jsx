import React, { useState, Fragment, useContext, useEffect } from "react";
import { PuzzleContext } from "../providers/PuzzleContext";
import {
  CssBaseline,
  Grid,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { firestore } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import image from "../assets/round1/iconkey.jpg";

const useStyle = makeStyles((theme) => ({
  loginContainer: {
    border: "1px solid grey",
    boxShadow: "5px 10px 30px grey",
    padding: 32,
  },
  logo: {
    fontFamily: "Bungee Shade, cursive",
    fontSize: "4rem",
  },
  welcomeTitle: {
    textAlign: "center",
  },
  imageStyle: {
    minWidth: "300px",
    width: "600px",
    margin: "16px",
  },
  welcomeDescription: {
    fontSize: "1.2rem",
    padding: "8px",
  },
  inputField: {
    height: "72px",
    fontSize: "1.5rem",
  },
}));

function Login(props) {
  const classes = useStyle();
  const [code, setCode] = useState("");
  const { setPuzzle } = useContext(PuzzleContext);

  const error = () =>
    toast.error("Invalid Code", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  const handleInputChange = (e) => {
    setCode(e.currentTarget.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (code.trim() !== "") {
      const docRef = firestore.collection("teams").doc(code);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setPuzzle(doc.data());
            localStorage.setItem("code", code);
            props.history.replace("/game");
          } else {
            error();
          }
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    let localCode = localStorage.getItem("code");
    if (localCode) {
      const docRef = firestore.collection("teams").doc(localCode);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setPuzzle(doc.data());
          props.history.replace("/game");
        }
      });
    }
  }, []);

  return (
    <Fragment>
      <Grid
        sm={12}
        md={6}
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.loginContainer}
      >
        <Grid item>
          <Typography variant="h3" className={classes.welcomeTitle}>
            Welcome Students!
          </Typography>
          <Typography className={classes.welcomeDescription}>
            <br />
            <br />
            This challenge will require you to work in your groups and
            communicate via Zoom.
            <br />
            <br />
            Round One will last 45 minutes and each puzzle will require you to
            submit an answer in the text box. If it is correct you will advance
            to the next puzzle. Do as many as you can in 45 minutes!
            <br />
            <br />
            Round Two will also last 45 minutes but instead of solving puzzles,
            you will be recreating famous statues, paintings and speeches in
            videos that you will submit to FlipGrid. Again, do as many as you
            can in 45 minutes!
            <br />
            <br />
            Finally Round Three will last 30 minutes in a lightning round to see
            which group will solve all the puzzles first!
          </Typography>
        </Grid>
        <Grid item>
          <img src={image} className={classes.imageStyle} />
        </Grid>
        <Grid item>
          <Typography className={classes.welcomeDescription}>
            To start, enter your given team code in the box below:
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="filled-basic"
            label="Code"
            variant="filled"
            className={classes.inputField}
            InputProps={{ className: classes.inputField }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            fullWidth
            onClick={handleLogin}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Fragment>
  );
}

export default Login;
