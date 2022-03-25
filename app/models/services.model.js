const mongoose = require("mongoose");

const Services = mongoose.model(
  "Services",
  new mongoose.Schema({
    serviceName: {type:String},
    thumbnail: {type:String}

  })
);

module.exports = Services;