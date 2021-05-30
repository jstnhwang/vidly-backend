const mongoose = require("mongoose");
const Joi = require("joi");

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

exports.Customer = Customer;
exports.validate = validateCustomer;
