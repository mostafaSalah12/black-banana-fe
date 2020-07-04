import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  welcomeText: {
    textAlign: "center",
    fontSize: "2.5rem",
  },
}));

function GameWaiting() {
  const classes = useStyle();
  return (
    <Grid Item>
      <Typography className={classes.welcomeText}>
        The game will begin soon!
      </Typography>
    </Grid>
  );
}

export default GameWaiting;
