const mongoose = require("mongoose");

const SubSubServices = mongoose.model(
  "subsubservices",
  new mongoose.Schema({
    subSubServiceName: {type:String},
    subserviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubServices",
    }
  })
);

module.exports = SubSubServices;