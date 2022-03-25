const mongoose = require("mongoose");

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    name: {type:String},
    companyName: {type:String},
    street: {type:String},
    city: {type:String},
    country: {type:String},
    postalCode: {type:Number},
    state: {type:String},
    phone: {type:Number},
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  })
);

module.exports = Address;