const db = require("../models");
const { subsubcategory:SubSubCategory } = db;
var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.getAllSubSubCategories = (req,res)=>{

    SubSubCategory.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Sub Sub Categories",
              data: data
          });
        }
    });
}

exports.getSingleSubSubCategory = (req,res)=>{

    SubSubCategory.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Sub Category",
              data: data
          });
        }
    });
}

exports.getSubSubCategoriesBySubCategoryId = (req,res)=>{
    const subcategoryId = mongoose.Types.ObjectId(req.params.id);
    SubSubCategory.find({subcategoryId:subcategoryId},(err,data)=>{
        console.log(data);
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Sub Category",
              data: data
          });
        }
    });
}

exports.createSubSubCategory = (req, res) => {
    const subSubCategory = new SubSubCategory({
    subSubCategoryName: req.body.sub_sub_category_name,
      subcategoryId:req.body.subcategoryId
    });
  
    subSubCategory.save((err, data) => {
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

exports.updateSubSubCategory = (req,res)=>{
  SubSubCategory.findByIdAndUpdate(req.params.id,{$set:{subSubCategoryName: req.body.sub_sub_category_name}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Sub Sub-Category updated successfully",
          data:data
      });
    }
  });
}

exports.deleteSubSubCategory = (req,res)=>{
    SubSubCategory.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Sub Sub-Category deleted successfully"
        });
      }
    });
  }



  exports.deleteSubSubCategoryByCategoryId = (req,res)=>{
    const subcategoryId = mongoose.Types.ObjectId(req.params.id);
    SubSubCategory.deleteMany({ subcategoryId: subcategoryId},(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Sub Sub-Category deleted successfully",
            data:data
        });
      }
    });
  }