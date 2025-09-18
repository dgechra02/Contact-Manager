const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
      // required fields with custom error message
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone address"],
    },
  },
  {
    timestamps: true,
  }
  // Second argument { timestamps: true }: Mongoose will automatically add createdAt and updatedAt fields.
);

module.exports = mongoose.model("Contact", contactSchema);
