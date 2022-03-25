const mongoose = require("mongoose");

const ServiceProduct = mongoose.model(
  "ServiceProduct",
  new mongoose.Schema({
    name: {type:String},
    description: {type:String},
    tags:{type:String},
    status: {type:Number},
    media: [
        {
          url:{type:String},
          type: {type:String}
        }
    ],
  })
);

module.exports = ServiceProduct;