const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (load === undefined || load === "") {
    emptyFields.push("load");
  }

  if (reps === undefined || reps === "") {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields
    });
  }

  if (
    Number.isNaN(Number(load)) ||
    Number.isNaN(Number(reps)) ||
    Number(load) < 0 ||
    Number(reps) < 0
  ) {
    return res.status(400).json({
      error: "Load and reps should be valid numbers",
      emptyFields: []
    });
  }

  try {
    const workout = await Workout.create({
      title,
      load,
      reps
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  createWorkout,
  deleteWorkout
};
