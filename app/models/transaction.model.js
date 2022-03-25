const mongoose = require("mongoose");
const Transaction = mongoose.model(
  "WalletTransaction",
  new mongoose.Schema({ 
    amount: { type: Number },
    type: { type: String }, // ReferEarn OR Products
    transactionType: { type: String }, // Credit OR Debit
    message: { type: String },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookings",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorServiceProduct",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }, {timestamps: true})
);
module.exports = Transaction;