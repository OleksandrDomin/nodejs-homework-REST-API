const Joi = require("joi");

const schemaJoi = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required name file" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required email file" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone file" })
});
 

const schemaJoiPatch = Joi.object({
  favorite: Joi.boolean()
    .required(),
})

const schemaJoiId =
  Joi.object({
id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
})
  
module.exports = { schemaJoi, schemaJoiPatch, schemaJoiId };