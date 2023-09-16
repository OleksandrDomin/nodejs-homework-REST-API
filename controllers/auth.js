const User = require("../models/user");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { HttpError } = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const sendEmaile = require("../helpers/sendEmaile");

const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const verificationToken = uuidv4();
const LOCALHOST_URL = process.env.BASE_URL;

async function register(req, res, next) {
  const { email, password } = req.body;
  // email: email
  const userInDb = await User.findOne({ email }).exec();
  if (userInDb !== null) {
    throw HttpError(409, "Email in use");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const user = await User.create({
    ...req.body,
    password: passwordHash,
    avatarURL,
    verificationToken,
  });

  const verifyEmaile = {
    to: email,
    subject: "Test emaile",
    html: `<a target="_black" href="${LOCALHOST_URL}/users/verify/${verificationToken}"> Click veryfy email </a>`,
  };
  
  await sendEmaile(verifyEmaile);

  res.status(201).send({ user: { email, subscription: user.subscription } });
}

async function veryfyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user.id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).send({ message: "Verification successful" });
}

async function resendVerifyEmaile(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Emaile not found");
  }
  if (user.verify) {
  throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmaile = {
    to: email,
    subject: "Test emaile",
    html: `<a target="_black" href="${LOCALHOST_URL}/users/verify/${user.verificationToken}"> Click veryfy email </a>`,
  };
  
  await sendEmaile(verifyEmaile);

  res.status(200).send({  message: "Verification email sent" });

}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user === null) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch !== true) {
    throw HttpError(401, "Email or password is wrong");
  }
  const TOKEN = process.env.JWT_TOKEN;

  const token = jwt.sign(
    {
      id: user._id,
      subscription: user.subscription,
    },
    TOKEN,
    {
      // expiresIn: 3600
      expiresIn: "5h",
    }
  );
  await User.findByIdAndUpdate(user._id, { token: token }).exec();
  res.send({ token: token, user: { email, subscription: user.subscription } });
}

async function logout(req, res, next) {
  const { id } = req.user;
  const user = await User.findById(id).exec();
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(req.user.id, { token: null });
  res.status(204).end();
}

async function current(req, res, next) {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
}

async function updateAvatar(req, res, next) {
  const { id } = req.user;

  const { path: tmpUpload, originalname } = req.file;

  const avatarName = `${id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, avatarName);

  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.status(200).send({ avatarURL });
}

module.exports = {
  register: ctrlWrapper(register),
 veryfyEmail: ctrlWrapper(veryfyEmail),
  resendVerifyEmaile: ctrlWrapper(resendVerifyEmaile),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateAvatar: ctrlWrapper(updateAvatar),
};
