const mongoose = require("mongoose");

const SubCategory = mongoose.model(
  "subcategory",
  new mongoose.Schema({
    subCategoryName: {type:String},
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
  })
);

module.exports = SubCategory;