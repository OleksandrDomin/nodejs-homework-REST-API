const express = require("express");
const contacts = require("../../models/contacts");
const HttpError = require("../../helpers/HttpError");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required name file" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required email file" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone file" }),
});


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
        const {name, email, phone} = req.body;
    if (!name && !email && !phone) {
      throw HttpError(400, "Missing fields")
    }
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contacts.removeContact(contactId);
    if (!removeContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {name, email, phone} = req.body;
    if (!name && !email && !phone) {
      throw HttpError(400, "Missing fields")
    }
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const updateContactByID = await contacts.updateContact(contactId, req.body);
    if (!updateContactByID) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(updateContactByID);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
