
const { HttpError } = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const Contact = require("../models/contacts");

const getAll = async (req, res, next) => {
  const allContacts = await Contact.find().exec();
  res.status(200).send(allContacts);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contactByID = await Contact.findById(id).exec();

  if (!contactByID) {
    throw HttpError(404, "Not found");
  }
  res.status(201).send(contactByID);
};

const create = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  const createContact = await Contact.create(contact);
  res.status(201).send(createContact);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).send(updatedContact);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const removeContavtByID = await Contact.findByIdAndDelete(id);
  if (!removeContavtByID) {
    throw HttpError(404, "Not found");
  }
  res.status(200).send({ message: "Contact deleted" });
};

async function updateStatus(req, res, next) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  if (!req.body || req.body.favorite === undefined) {
    throw HttpError(400, "Missing field favorite");
  }
  const updatedContactStatus = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });

  if (!updatedContactStatus) {
    throw HttpError(404, "Not found");
  }
  res.status(200).send(updatedContactStatus);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  updateStatus: ctrlWrapper(updateStatus),
};
