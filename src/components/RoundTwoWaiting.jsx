import React, { Fragment } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  welcomeTitle: {
    textAlign: "center",
    fontSize: "1.7rem",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  imageStyle: {
    minWidth: "300px",
    width: "400px",
    maxHeight: "700px",
    margin: "32px",
  },
}));

function RoundTwoWaiting() {
  const classes = useStyle();
  return (
    <Fragment>
      <Grid item>
        <img
          src="https://dudefromearth.com/wp-content/uploads/2019/03/ben-franklin-sun-glasses.jpg"
          className={classes.imageStyle}
          alt="welcome"
        />
      </Grid>
      <Grid Item>
        <Typography className={classes.welcomeTitle}>Amazing job!</Typography>
        <Typography className={classes.welcomeText}>
          You have solved your way through some Franklin’s toughest puzzles. We
          will begin our analysis. Sit tight for now, round 2 will start
          shortly!
        </Typography>
      </Grid>
    </Fragment>
  );
}

export default RoundTwoWaiting;
