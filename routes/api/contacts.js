const express = require("express");
const ctrl = require("../../controllers/contacts");

const  validateData = require("../../middlewares/validateData");
const schemaContacts = require("../../schemas/contacts");

const router = express.Router();


router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/",  validateData(schemaContacts.schema), ctrl.add);

router.put("/:contactId", validateData(schemaContacts.schema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
