const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth");
const validateAuth = require("../../middlewares/validateAuth");
const { schemaJoiAuth } = require("../../schemas/aust");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { resizeAvatar } = require("../../middlewares/resizeAvatar");


const { validateToken } = require("../../middlewares/validateToken");
const upload = require("../../middlewares/upload");

const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  ctrlWrapper(validateAuth(schemaJoiAuth)),
  AuthController.register
);
router.post(
  "/login",
  jsonParser,
  ctrlWrapper(validateAuth(schemaJoiAuth)),
  AuthController.login
);
router.post(
  "/logout",
  jsonParser,
  ctrlWrapper(validateToken),
  AuthController.logout
);
router.get(
  "/current",
  jsonParser,
  ctrlWrapper(validateToken),
  AuthController.current
);
router.patch(
  "/avatars",
  ctrlWrapper(validateToken),
  upload.single("avatar"),
  ctrlWrapper(resizeAvatar),
  AuthController.updateAvatar
);

module.exports = router;
