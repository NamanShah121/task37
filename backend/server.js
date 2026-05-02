const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const workoutRoutes = require("./routes/workouts");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Workout Buddy API is running" });
});

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("connected to db and listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
