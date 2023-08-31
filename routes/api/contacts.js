const express = require("express");
const contactController = require('../../controllers/contacts')
const router = express.Router();
const jsonParser = express.json()

const ctrlWrapper = require("../../helpers/ctrlWrapper");

const validateData = require("../../middlewares/validateData");

const schemaJoi = require("../../schemas/contacts");

router.get("/", contactController.getAll);
router.post("/", jsonParser, ctrlWrapper(validateData(schemaJoi.schema)), contactController.create);

router.get("/:id", contactController.getById);
router.delete("/:id", contactController.remove);
router.put("/:id", jsonParser, ctrlWrapper(validateData(schemaJoi.schema)),  contactController.update);

router.patch('/:id/favorite', jsonParser,  contactController.updateStatus )

module.exports = router;
