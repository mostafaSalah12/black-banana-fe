import React, { useState } from "react";
import { Grid, Button, TextField, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  inputField: {
    height: "72px",
    fontSize: "1.5rem",
  },
  contaierStyle: {
    marginBottom: "64px",
    marginTop: "16px",
  },
}));
export default function Question({ handleAnswer }) {
  const classes = useStyle();
  const [answer, setAnswer] = useState("");
  const handleAnswerChange = (e) => {
    setAnswer(e.currentTarget.value);
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
      className={classes.contaierStyle}
    >
      <Grid item>
        <TextField
          id="filled-basic"
          label="Type in answer"
          variant="filled"
          className={classes.inputField}
          InputProps={{ className: classes.inputField }}
          onChange={handleAnswerChange}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          fullWidth
          onClick={(e) => handleAnswer(e, answer)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
