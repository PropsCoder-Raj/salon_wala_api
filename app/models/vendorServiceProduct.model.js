const mongoose = require("mongoose");

const ServiceProduct = mongoose.model(
  "VendorServiceProduct",
  new mongoose.Schema({
    time: {type: Number},
    price: {type: Number},  
    serviceProduct: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProduct"
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = ServiceProduct;