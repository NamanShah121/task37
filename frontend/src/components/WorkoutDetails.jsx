import { formatDistanceToNow } from "date-fns";
import { useWorkouts } from "../hooks/useWorkouts";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkouts();

  const handleClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/workouts/${workout._id}`, {
        method: "DELETE"
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    } catch (err) {
      console.log("delete failed");
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className="created-text">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button className="delete-btn" onClick={handleClick}>
        🗑
      </button>
    </div>
  );
}

export default WorkoutDetails;
