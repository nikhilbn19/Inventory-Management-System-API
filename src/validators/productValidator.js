const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null),
  stock_quantity: Joi.number().integer().min(0).default(0),
  low_stock_threshold: Joi.number().integer().min(0).default(0),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow("", null),
  stock_quantity: Joi.number().integer().min(0).messages({
    "number.min": "Stock cannot be negative",
  }),
  low_stock_threshold: Joi.number().integer().min(0),
}).min(1);

const stockOperationSchema = Joi.object({
  amount: Joi.number().integer().min(1).required(),
});

module.exports = { createSchema, updateSchema, stockOperationSchema };
