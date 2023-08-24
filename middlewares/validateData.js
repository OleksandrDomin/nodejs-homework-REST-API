const { HttpError } = require("../helpers/HttpError");


const validateData = schema => {
    const func = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    next (HttpError(400, "Missing fields"));
  }
    const { error } = schema.validate(req.body);
    if (error) {
        next(HttpError(400, error.message));
        }
        next();
    }
    return func
};
module.exports = validateData  ;