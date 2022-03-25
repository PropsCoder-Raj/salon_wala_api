const db = require("../models");
const { subsubservices:SubSubServices } = db;
var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.getAllSubSubServices = (req,res)=>{

    SubSubServices.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Sub Sub Services",
              data: data
          });
        }
    });
}

exports.getSingleSubSubServices = (req,res)=>{

    SubSubServices.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Sub Services",
              data: data
          });
        }
    });
}

exports.getSubSubServicesBySubServicesId = (req,res)=>{
    const subserviceId = mongoose.Types.ObjectId(req.params.id);
    SubSubServices.find({subserviceId:subserviceId},(err,data)=>{
        console.log(data);
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Sub Services",
              data: data
          });
        }
    });
}

exports.createSubSubServices = (req, res) => {
    const subSubServices = new SubSubServices({
    subSubServiceName: req.body.sub_sub_service_name,
    subserviceId:req.body.subserviceId
    });
  
    subSubServices.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Sub-Services Created Successfully",
            data:data
        });
    });
};

exports.updateSubSubServices = (req,res)=>{
  SubSubServices.findByIdAndUpdate(req.params.id,{$set:{subSubServiceName: req.body.sub_sub_service_name}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Sub Sub-Services updated successfully",
          data:data
      });
    }
  });
}

exports.deleteSubSubServices = (req,res)=>{
    SubSubServices.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Sub Sub-Services deleted successfully"
        });
      }
    });
  }



  exports.deleteSubSubServicesByServicesId = (req,res)=>{
    const subserviceId = mongoose.Types.ObjectId(req.params.id);
    SubSubServices.deleteMany({ subserviceId: subserviceId},(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Sub Sub-Services deleted successfully",
            data:data
        });
      }
    });
  }