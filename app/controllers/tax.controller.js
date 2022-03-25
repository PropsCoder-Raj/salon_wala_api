const db = require("../models");
const { tax:Tax } = db;

exports.getAllTax = (req,res)=>{

    Tax.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Tax",
              data: data
          });
        }
    });
}

exports.getSingleTax = (req,res)=>{

    Tax.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Tax",
              data: data
          });
        }
    });
}

exports.createTax = (req, res) => {
    const tax = new Tax({
      name: req.body.name,
      percentage: req.body.percentage
    });
  
    tax.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Tax Created Successful"
        });
    });
};

exports.updateTax = (req,res)=>{
  Tax.findByIdAndUpdate(req.params.id,{$set:{name: req.body.name,percentage: req.body.percentage}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Tax updated successfully"
      });
    }
  });
}

exports.deleteTax = (req,res)=>{
    Tax.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Tax deleted successfully"
        });
      }
    });
  }
