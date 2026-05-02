import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

export const useWorkouts = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("useWorkouts must be used inside WorkoutsContextProvider");
  }

  return context;
};
