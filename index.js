const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const Joi = require("joi");
const home = require("./routes/home");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

// ----- Middleware ----- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", home);
app.use("/api/genres", genres);

// ---- Configuration ---- //
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled");
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
