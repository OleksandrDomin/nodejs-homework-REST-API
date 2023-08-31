const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required name file" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required email file" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone file" }),
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing required favorite file" }),
});


module.exports = { schema, };