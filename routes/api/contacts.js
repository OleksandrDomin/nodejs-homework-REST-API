const express = require("express");
const contactController = require('../../controllers/contacts')
const router = express.Router();
const jsonParser = express.json()

const ctrlWrapper = require("../../helpers/ctrlWrapper");

const validateData = require("../../middlewares/validateData");
const validatePatch = require("../../middlewares/validatePatch");
const validateId = require("../../middlewares/validateId");

const { schemaJoi, schemaJoiPatch, schemaJoiId} = require("../../schemas/contacts");

router.get("/", contactController.getAll);
router.post("/", jsonParser, ctrlWrapper(validateData(schemaJoi)), contactController.create);

router.get("/:id", ctrlWrapper(validateId(schemaJoiId)), contactController.getById);
router.delete("/:id", ctrlWrapper(validateId(schemaJoiId)), contactController.remove);
router.put("/:id", ctrlWrapper(validateId(schemaJoiId)), jsonParser, ctrlWrapper(validateData(schemaJoi)),  contactController.update);

router.patch('/:id/favorite', jsonParser, ctrlWrapper(validateId(schemaJoiId)), ctrlWrapper(validatePatch(schemaJoiPatch)), contactController.updateStatus )

module.exports = router;
