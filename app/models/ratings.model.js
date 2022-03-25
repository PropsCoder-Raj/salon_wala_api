const mongoose = require("mongoose");
const Ratings = mongoose.model(
    "Ratings",
    new mongoose.Schema({
        rating: { type: Number },
        productId : { type: String },
        review : { type: String },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {type: Date}
    })
);
module.exports = Ratings;