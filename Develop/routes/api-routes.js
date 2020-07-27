const db = require("../models");
const express = require("epress");
const router = express.Router();

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkouts) => {
      res.json({
        error: false,
        data: dbWorkouts,
        message: "All workouts found.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve all workouts.",
      });
    });
});

router.post("/api/workouts", (req, res) => {
  // Sanitize req.body inputs
  if (!req.body.name || !req.body.name.trim().length) {
    return res.status(400).json({
      error: true,
      data: null,
      message: "Please enter valid information.",
    });
  }

  db.Workout.create(req.body)
    .then((createdWorkout) => {
      res.json({
        error: false,
        data: createdWorkout,
        message: "Successfully created new workout.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to create new workout.",
      });
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body} },
    { new: true }
  )
    .then((updatedWorkouts) => {
      console.log(updatedWorkouts);
      res.json({
        error: false,
        data: updatedWorkouts,
        message: "Successfully updated workout",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "unable to update workout",
      });
    });
});

module.exports = router;
