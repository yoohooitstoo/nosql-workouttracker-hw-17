const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: "Workout is Required"
  },
  date: {
      type: Date,
      default: Date.now
  },
  duration: {
      type: Number,
      default: 0
  },
  exercises: [{
    name: {
        type: String,
        trim: true,
        require: "Name is Required"
      },
    type: {
        type: String,
        trim: true,
        require: "Type is Required"
    },
    weight: {
        type: Number,
        max: 600,
    },
    reps: {
        type: Number,
        max: 50,
    },
    distance: {
        type: Number,
        min: 1
    },
    sets: {
        type: Number,
        min: 1,
        max: 10
    }
  }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;