const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect(
    "mongodb+srv://jstnhwang:PyakZN8aRzVfmzkH@cluster0.rvnwj.mongodb.net/vidly?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
    () => winston.info("Connected to MongoDB...")
  );
};
