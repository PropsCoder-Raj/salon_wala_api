const mongoose = require("mongoose");

const Category = mongoose.model(
  "category",
  new mongoose.Schema({
    categoryName: {type:String},
    thumbnail: {type:String}

  })
);

module.exports = Category;