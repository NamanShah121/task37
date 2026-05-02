import { useState } from "react";
import { useWorkouts } from "../hooks/useWorkouts";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

function WorkoutForm() {
  const { dispatch } = useWorkouts();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/workouts`, {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Could not add workout");
        setEmptyFields(json.emptyFields || []);
      }

      if (response.ok) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (err) {
      setError("Could not connect to the server");
      setEmptyFields([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button disabled={isLoading}>{isLoading ? "Adding..." : "Add Workout"}</button>

      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
