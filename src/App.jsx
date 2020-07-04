import React, { useContext, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";

import Login from "./components/Login";

import theme from "./components/Theme";
import "./App.css";
import { PuzzleContext } from "./providers/PuzzleContext";
import GameScreen from "./components/Game";


const useStyle = makeStyles((theme) => ({
  appContiner: {
    flex: "1",
    minHeight: "100vh",
    backgroundColor: "#faebca",
  },
}));

function App() {
  const classes = useStyle();
  const { puzzle } = useContext(PuzzleContext);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          className={classes.appContiner}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid md={3}></Grid>
          <Switch>
            {puzzle ? (
              <Fragment>
                <Route path="/game" component={GameScreen} />
              </Fragment>
            ) : null}

            <Route path="/" component={Login} />
          </Switch>
          <Grid md={3}></Grid>
        </Grid>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
