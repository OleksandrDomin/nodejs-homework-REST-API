const express = require("express");
const ctrl = require("../../controllers/contacts");
const ctrlWrapper  = require("../../helpers/ctrlWrapper");

const  validateData = require("../../middlewares/validateData");
const schemaContacts = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrlWrapper(validateData(schemaContacts.schema)) , ctrl.add);

router.put("/:contactId", ctrlWrapper(validateData(schemaContacts.schema)), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
