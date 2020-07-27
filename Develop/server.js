const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const viewRoutes = require("./routes/view-routes");
const apiroutes = require("./routes/api-routes");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(viewRoutes);
app.use(apiRoutes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});


require

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});