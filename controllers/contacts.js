const contacts = require("../models/contacts");
const { HttpError } = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

// const schema = require("../schemas/contacts")

// const Joi = require("joi");

// const schema = Joi.object({
//   name: Joi.string()
//     .required()
//     .messages({ "any.required": "Missing required name file" }),
//   email: Joi.string()
//     .required()
//     .messages({ "any.required": "Missing required email file" }),
//   phone: Joi.string()
//     .required()
//     .messages({ "any.required": "Missing required phone file" }),
// });

const getAll = async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const add = async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   if (!name && !email && !phone) {
//     throw HttpError(400, "Missing fields");
//   }
//   const { error } = schema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.message);
//   }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const updateById = async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   if (!name && !email && !phone) {
//     throw HttpError(400, "Missing fields");
//   }
//   const { error } = schema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.message);
//   }
  const { contactId } = req.params;
  const updateContactByID = await contacts.updateContact(contactId, req.body);
  if (!updateContactByID) {
    throw HttpError(404, "Not found");
    }
    
  res.status(200).json(updateContactByID);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = await contacts.removeContact(contactId);
  if (!removeContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
