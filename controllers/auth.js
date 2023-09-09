const User = require('../models/user');
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { HttpError } = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
    const { email, password } = req.body;
        // email: email
        const userInDb = await User.findOne({ email }).exec();
    if (userInDb !== null) {
             throw HttpError(409, "Email in use");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: passwordHash });
        res.status(201).send({ user: { email, subscription: user.subscription } });
}

async function login(req, res, next) {
  const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user === null) {
        throw HttpError(401, "Email or password is wrong");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch !== true) {
    throw HttpError(401, "Email or password is wrong");
    }
    const TOKEN = process.env.JWT_TOKEN

    const token = jwt.sign(
      {
        id: user._id,
        subscription: user.subscription,
      },
      TOKEN, {
        // expiresIn: 3600
        expiresIn: "5h",
    });
    await User.findByIdAndUpdate(user._id, { token: token }).exec();
    res.send({ token: token, user: { email, subscription: user.subscription } });
}

async function logout(req, res, next) { 

 const {id} = req.user;
      const user = await User.findById(id).exec();
    if (!user) {
        throw HttpError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(req.user.id, { token: null });
  res.status(204).end();
}

async function current(req, res, next) { 
 const {email, subscription} = req.user;
  res.status(200).json({email, subscription});
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
 current: ctrlWrapper(current),
};
