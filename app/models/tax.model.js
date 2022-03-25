const mongoose = require("mongoose");

const Tax = mongoose.model(
  "tax",
  new mongoose.Schema({
    name: {type:String},
    percentage: {type:String}
  })
);

module.exports = Tax;