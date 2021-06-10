const mongoose = require("mongoose");
const config = require("config");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

const { MONGODB_URI } = process.env;

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERR: jwtPrivateKey is not defined.");
  process.exit(1);
}

try {
  mongoose.connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
    () => console.log("Connected to MongoDB...")
  );
} catch (e) {
  console.error("Could not connect to MongoDB");
}

// ----- Middleware ----- //
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
