const db = require("../models");
const { category:Category } = db;
var bcrypt = require("bcryptjs");

exports.getAllCategories = (req,res)=>{

    Category.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Categories",
              data: data
          });
        }
    });
}

exports.getSingleCategory = (req,res)=>{

    Category.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Category",
              data: data
          });
        }
    });
}

exports.createCategory = (req, res) => {
    const category = new Category({
      categoryName: req.body.category_name,
      thumbnail: req.body.thumbnail
    });
  
    category.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Category Created Successfully",
            data:data
        });
    });
};

exports.updateCategory = (req,res)=>{
  Category.findByIdAndUpdate(req.params.id,{$set:{categoryName: req.body.category_name,thumbnail: req.body.thumbnail}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Category updated successfully",
          data:data
      });
    }
  });
}

exports.deleteCategory = (req,res)=>{
    Category.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Category deleted successfully"
        });
      }
    });
  }
