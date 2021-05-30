const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

try {
  mongoose.connect(
    "mongodb://localhost/vidly",
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

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
