const mongoose = require("mongoose");

const SubSubCategory = mongoose.model(
  "subsubcategory",
  new mongoose.Schema({
    subSubCategoryName: {type:String},
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    }
  })
);

module.exports = SubSubCategory;