import React, { Fragment, useContext, useEffect } from "react";
import RoundOne from "./RoundOne";
import RoundTwo from "./RoundTwo/Puzzle";
import RoundThree from "./RoundThree";
import { firestore } from "./firebase";
import { PuzzleContext } from "../providers/PuzzleContext";
import GameWaiting from "./GameWaiting";
import ResultsScreen from "./ResultsScreen";

function GameScreen() {
  const { puzzle, setPuzzle } = useContext(PuzzleContext);
  const getActiveRound = () => {
    if (puzzle.activeRound === "Not-Started") {
      return <GameWaiting />;
    } else if (puzzle.activeRound === "Round 1") {
      return <RoundOne />;
    } else if (puzzle.activeRound === "Round 2") {
      return <RoundTwo />;
    } else if (puzzle.activeRound === "Round 3") {
      return <RoundThree />;
    } else if (puzzle.activeRound === "Finished") {
      return <ResultsScreen />;
    }
  };

  useEffect(() => {
    firestore
      .collection("teams")
      .doc(puzzle.id)
      .onSnapshot((doc) => {
        setPuzzle(doc.data());
      });
  }, []);
  return <Fragment>{getActiveRound()}</Fragment>;
}

export default GameScreen;
