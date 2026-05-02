import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkouts } from "../hooks/useWorkouts";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Home() {
  const { workouts, dispatch } = useWorkouts();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${apiUrl}/api/workouts`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
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
