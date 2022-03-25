const db = require("../models");
const { user: User, contacts: Contacts } = db;

exports.getAllContacts = (req, res) => {
  Contacts.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Contacts",
        data: data
      });
    }
  }).sort({createdAt: 'desc'});
}

exports.getSingleContacts = (req, res) => {

  Contacts.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "Contacts",
        data: data
      });
    }
  });
}

exports.createContacts = (req, res) => {
  const contacts = new Contacts({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    status: false
  });

  contacts.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Contacts Created Successful"
    });
  });
};

exports.updateStatus = (req, res) => {
  Contacts.findByIdAndUpdate(req.params.id, { $set: { status: true } }, (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "Contacts updated successfully"
      });
    }
  });
}
