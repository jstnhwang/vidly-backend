const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

// ---- MongoDB Schema for genres ---- //
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
};

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return req.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return req.status(400).send(error.details[0].message);

  const genre = await genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("The genre with given ID was not found");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("The genre with given ID was not found");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("The genre with given ID was not found");

  res.send(genre);
});

module.exports = router;
