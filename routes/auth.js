const { User } = require("../models/user");
const _ = require("lodash");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid user or password");

  const validPwd = await bycrypt.compare(req.body.password, user.password);
  if (!validPwd) return res.status(400).send("Invalid user or password");

  const token = user.generateAuthToken();
  res.send(token);
});

const validate = request => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity(complexityOptions)
  });

  return schema.validate(request);
};

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
};

module.exports = router;
