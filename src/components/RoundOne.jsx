import React, { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import PuzzleTwo from "./RoundOne/PuzzleTwo";
import PuzzleOne from "./RoundOne/PuzzleOne";
import PuzzleThree from "./RoundOne/PuzzleThree";
import PuzzleFour from "./RoundOne/PuzzleFour";
import PuzzleFive from "./RoundOne/PuzzleFive";
import PuzzleSix from "./RoundOne/PuzzleSix";
import PuzzleSeven from "./RoundOne/PuzzleSeven";
import { PuzzleContext } from "../providers/PuzzleContext";
import { firestore } from "./firebase";
import RoundTwoWaiting from "./RoundTwoWaiting";

function RoundOne() {
  const { puzzle } = useContext(PuzzleContext);
  const [index, setIndex] = useState(puzzle.round1.currentIndex);

  useEffect(() => {
    setIndex(puzzle.round1.currentIndex);
  }, [puzzle]);

  const getComponent = () => {
    if (index === 0) return <PuzzleOne />;
    if (index === 1) return <PuzzleTwo />;
    if (index === 2) return <PuzzleThree />;
    if (index === 3) return <PuzzleFour />;
    if (index === 4) return <PuzzleFive />;
    if (index === 5) return <PuzzleSix />;
    if (index === 6) return <PuzzleSeven />;
    if (index > 6) return <RoundTwoWaiting />;
  };
  return <Fragment>{getComponent()}</Fragment>;
}

export default RoundOne;
