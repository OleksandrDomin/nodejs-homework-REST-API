const { HttpError } = require("../helpers/HttpError");

const validatePatch = schemaJoiPatch => {
     const func = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body;
    if (!name && !email && !phone && !favorite) {
      next(HttpError(400, "Missing fields"));
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
