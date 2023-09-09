const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HttpError } = require("../helpers/HttpError");

const TOKEN = process.env.JWT_TOKEN;

async function validateToken(req, res, next) {
  //  const {authorization = ' '} = req.headers
  // const [bearer, token] = authorization.split(" ");

  const authHeader = req.headers.authorization || " ";
  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
    }

    const {id} = jwt.verify(token, TOKEN);

    const user = await User.findById(id).exec();
  
    if (user.token !== token) {
      next(HttpError(401, "Not authorized"));
      }
  // req.user = { id: id, subscription: subscription };
  req.user = user;
      next();
}

module.exports = { validateToken };
