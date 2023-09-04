const { HttpError } = require("../helpers/HttpError");

const validateId = schemaJoiId => {
     const func = async (req, res, next) => {
    const { error } = schemaJoiId.validate(req.params);
    if (error) {
      next(HttpError(400, "Not valid ID, ID must be a string with length 24 simbols."));
    }
    next();
  };
  return func;
};

module.exports = validateId;