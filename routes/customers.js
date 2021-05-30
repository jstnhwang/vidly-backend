const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

// ---- MongoDB Schema for customers ---- //
const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  phone: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 50,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = customer => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(3).max(50).required()
  });

  return schema.validate(customer);
};

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return req.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return req.status(400).send(error.details[0].message);

  const customer = await customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("The customer with given ID was not found");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("The customer with given ID was not found");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("The customer with given ID was not found");

  res.send(customer);
});

module.exports = router;
