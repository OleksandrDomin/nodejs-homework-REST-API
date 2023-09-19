const { HttpError } = require("../helpers/HttpError");

const validateEmaile = schemaJoiVarifyEmaile => {
    const func = async (req, res, next) => {
    const { error } = schemaJoiVarifyEmaile.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateEmaile;