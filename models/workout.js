const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          require: "Type is Required",
        },
        name: {
          type: String,
          trim: true,
          require: "Name is Required",
        },
        duration: {
          type: Number,
          default: 0,
        },
        weight: {
          type: Number,
          max: 600,
        },
        reps: {
          type: Number,
          max: 50,
        },
        sets: {
          type: Number,
          min: 1,
          max: 10,
        },
        distance: {
          type: Number,
          min: 1,
        },
      },
    ],
  },
  opts
);

WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (let i = 0; i < this.exercises.length; i++) {
    totalDuration += this.exercises[i].duration;
  }
  return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
