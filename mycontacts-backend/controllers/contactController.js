// use to write the logic of end points

const aysncHandler = require("express-async-handler");
// it will automatically handle all errors, no need to write try catch block

const Contact = require("../models/contactModel");
// it is bringing the contact model as prismaClient.contact to make the crud operations

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = aysncHandler(async (req, res) => {
  console.log("getcontacts ran");
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc create new contacts
// @route POST /api/contacts
// @access private
const createContact = aysncHandler(async (req, res) => {
  console.log("req body is : ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are manadatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = aysncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc update contact
// @route PUT /api/contacts/:id
// @access private
const updateConatct = aysncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user's contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // tells Mongoose to return the updated document instead of the old one.
  );
  res.status(200).json(updatedContact);
});

// @desc delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = aysncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user's contacts");
  }

  await Contact.deleteOne({_id: req.params.id});

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateConatct,
  deleteContact,
};
