const mongoose = require("mongoose");

const SubServices = mongoose.model(
  "subservices",
  new mongoose.Schema({
    subServiceName: {type:String},
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
    }
  })
);

module.exports = SubServices;