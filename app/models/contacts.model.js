const mongoose = require("mongoose");
const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
    status: { type: Boolean }
  }, {timestamps: true})
);
module.exports = Contact;