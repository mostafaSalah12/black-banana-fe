import React, { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import PuzzleTwo from "./RoundThree/PuzzleTwo";
import PuzzleOne from "./RoundThree/PuzzleOne";

import { PuzzleContext } from "../providers/PuzzleContext";

function RoundThree() {
  const { puzzle } = useContext(PuzzleContext);
  const [index, setIndex] = useState(puzzle.round3.currentIndex);

  useEffect(() => {
    setIndex(puzzle.round3.currentIndex);
  }, [puzzle]);

  const getComponent = () => {
    if (index === 0) return <PuzzleOne />;
    if (index === 1) return <PuzzleTwo />;
  };
  return <Fragment>{getComponent()}</Fragment>;
}

export default RoundThree;
