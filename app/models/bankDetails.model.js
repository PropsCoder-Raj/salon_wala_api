const mongoose = require("mongoose");

const BankDetails = mongoose.model(
  "bankDetails",
  new mongoose.Schema({
    bankName: {type:String},
    bankIFSC: {type:String},
    accountNo: {type:Number},
    accountType: {type:String},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  })
);

module.exports = BankDetails;