const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@ desc Get all contacts
//route GET api/contacts
//access PUBLIC
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

//@ desc Create new contact
//route POST api/contacts
//access PUBLIC
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("All field are mandatory !");
  }
  const contact = await Contact.create({ name, email, user_id: req.user.id });
  res.status(201).json({ contact });
});
//@ desc update  a contact
//route PUT api/contacts
//access PUBLIC
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ updatedContact });
});
//@ desc delete contact
//route DELETE api/contacts
//access PUBLIC
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  await Contact.remove();
  res.status(200).json(contact);
});
//@ desc Get a contact
//route GET api/contacts/:id
//access PUBLIC
const getaContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ contact });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getaContact,
};
