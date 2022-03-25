const mongoose = require("mongoose");

const Coupon = mongoose.model(
  "Coupon",
  new mongoose.Schema({
    name: {type:String},
    code: {type:String},
    status: {type:Number},
    discount: {type:Number},
    amountLimit: {type:Number}
  })
);

module.exports = Coupon;