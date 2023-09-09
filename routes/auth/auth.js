const express = require('express')
const router = express.Router();
const AuthController = require('../../controllers/auth');
const validateAuth = require('../../middlewares/validateAuth')
const { schemaJoiAuth} = require('../../schemas/aust')
const ctrlWrapper = require('../../helpers/ctrlWrapper')

const { validateToken } = require("../../middlewares/validateToken")

const jsonParser = express.json();

router.post('/register', jsonParser,  ctrlWrapper(validateAuth(schemaJoiAuth)), AuthController.register);
router.post('/login', jsonParser,  ctrlWrapper(validateAuth(schemaJoiAuth)), AuthController.login);
router.post('/logout', jsonParser, ctrlWrapper(validateToken), AuthController.logout);
router.get('/current', jsonParser, ctrlWrapper(validateToken), AuthController.current);

module.exports = router;