const { HttpError } = require("../helpers/HttpError");

const validateAuth = schemaJoiAuth => {
  const func = async (req, res, next) => {
    const { password, email} = req.body;
    if (!password && !email) {
      next(HttpError(400, "Missing fields"));
    }
    const { error } = schemaJoiAuth.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateAuth;