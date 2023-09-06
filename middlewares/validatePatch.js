const { HttpError } = require("../helpers/HttpError");

const validatePatch = schemaJoiPatch => {
     const func = async (req, res, next) => {
       const { favorite } = req.body;
    if (favorite === undefined) {
      next(HttpError(400, "Missing field favorite"));
    }
    const { error } = schemaJoiPatch.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validatePatch;
