import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkouts } from "../hooks/useWorkouts";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Home() {
  const { workouts, dispatch } = useWorkouts();
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/workouts`);
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
          setLoadError("");
        } else {
          setLoadError(json.error || "Could not load workouts");
        }
      } catch (err) {
        setLoadError("Could not connect to the server");
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {loadError && <div className="error-message">{loadError}</div>}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
}

export default Home;
