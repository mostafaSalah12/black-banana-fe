import React, { useState, useMemo } from "react";
import { PuzzleContext } from "./PuzzleContext";

export const PuzzleProvider = ({ children }) => {
  const [puzzle, setPuzzle] = useState(null);
  const providerValue = useMemo(() => ({ puzzle, setPuzzle }), [puzzle, setPuzzle]);
  return (
    <PuzzleContext.Provider value={providerValue}>
      {children}
    </PuzzleContext.Provider>
  );
};
