const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    tags: { type: String },
    model: { type: String },
    sku: { type: String },
    price: { type: String },
    isShippingRequired: { type: Number },
    weight: { type: Number },
    featured: { type: Boolean },
    status: { type: Number },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories"
    },
    subcategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategories"
    },
    subsubcategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsubcategories"
    },
    Length: { type: Number },
    Width: { type: Number },
    Height: { type: Number },
    media: [
      {
        url: { type: String },
        type: { type: String }
      }
    ],
    taxes: [
      {
        _id: { type: String },
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

  })
);

module.exports = Product;