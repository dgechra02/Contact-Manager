const express = require("express");
const router = express.Router();
const {getContacts, createContact, getContact, updateConatct, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validTokenHandler");

// router.route("/").get(getContacts);

// router.route("/").post(createContact);

// router.route("/:id").get(getContact);

// router.route("/:id").put(updateConatct);

// router.route("/:id").delete(deleteContact);

// to make them short > for similar routes

// using validate token on all the routes
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateConatct).delete(deleteContact);


module.exports = router;