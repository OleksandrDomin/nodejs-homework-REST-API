const Joi = require("joi");

const schemaJoiAuth = Joi.object({
        password: Joi.string()
            .required()
            .messages({ "any.required": "Missing required password file" }),
        email: Joi.string()
            .required()
            .messages({ "any.required": "Missing required email file" }),
});
 
  
module.exports = { schemaJoiAuth};