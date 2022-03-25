const db = require("../models");
const { subcategory:SubCategory } = db;
var bcrypt = require("bcryptjs");

exports.getAllSubCategories = (req,res)=>{

    SubCategory.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Sub Categories",
              data: data
          });
        }
    });
}

exports.getSingleSubCategory = (req,res)=>{

    SubCategory.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Category",
              data: data
          });
        }
    });
}

exports.getSubCategoriesByCategoryId = (req,res)=>{

    SubCategory.find({categoryId:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Category",
              data: data
          });
        }
    });
}

exports.createSubCategory = (req, res) => {
    const subCategory = new SubCategory({
      subCategoryName: req.body.sub_category_name,
      categoryId:req.body.categoryId
    });
  
    subCategory.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Sub-Category Created Successfully",
            data:data
        });
    });
};

exports.updateSubCategory = (req,res)=>{
  SubCategory.findByIdAndUpdate(req.params.id,{$set:{subCategoryName: req.body.sub_category_name}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Sub-Category updated successfully",
          data:data
      });
    }
  });
}

exports.deleteSubCategory = (req,res)=>{
    SubCategory.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Sub-Category deleted successfully"
        });
      }
    });
  }
