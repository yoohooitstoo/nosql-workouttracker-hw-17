const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
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

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .limit(7)
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
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
  db.Workout.create(req.body)
    .then((createdWorkout) => {
      res.json(createdWorkout);
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
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body} },
    { new: true }
  )
    .then((updatedWorkouts) => {
      console.log(updatedWorkouts);
      res.json(updatedWorkouts);
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
