const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    salutation: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    mobile: { type: Number },
    dob: { type: Date },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }
    ],
    address: { type: String },
    gender: { type: String },
    shopName: { type: String },
    shopMobile: { type: Number },
    shopEmail: { type: String },
    shopAddress: { type: String },
    shopPostalCode: { type: Number },
    pickupAddress: { type: String },
    pickupPostalCode: { type: Number },
    lat: { type: String },
    long: { type: String },
    wallet: { type: Number },
    commission: { type: Number },
    timings:{type:Array},
    usualTime:{type:String},
    balance: {type: Number},
    code: {type: String},
    referralCodeApply: {type: Boolean},
    provider: {type: String}
  }, { timestamps: true })
);

module.exports = User;