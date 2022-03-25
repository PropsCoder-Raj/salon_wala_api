const mongoose = require("mongoose");

const Banner = mongoose.model(
  "settings",
  new mongoose.Schema({
    amount: {type:Number},
    maximumOrderSubtotal: {type:Number},
    minimumOrderSubtotal: {type:Number},
  })
);

module.exports = Banner;