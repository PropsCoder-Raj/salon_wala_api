const mongoose = require("mongoose");

const City = mongoose.model(
  "city",
  new mongoose.Schema({
    cityName: {type:String},
    thumbnail: {type:String}

  })
);

module.exports = City;