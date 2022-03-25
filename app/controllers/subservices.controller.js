const db = require("../models");
const { subservices:SubServices } = db;
var bcrypt = require("bcryptjs");

exports.getAllSubServices = (req,res)=>{

    SubServices.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Sub Services",
              data: data
          });
        }
    });
}

exports.getSingleSubServices = (req,res)=>{

    SubServices.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Services",
              data: data
          });
        }
    });
}

exports.getSubServicesByServicesId = (req,res)=>{

    SubServices.find({serviceId:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Sub Services",
              data: data
          });
        }
    });
}

exports.createSubServices = (req, res) => {
    const subServices = new SubServices({
      subServiceName: req.body.sub_service_name,
      serviceId:req.body.serviceId
    });
  
    subServices.save((err, data) => {
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

exports.updateSubServices = (req,res)=>{
  SubServices.findByIdAndUpdate(req.params.id,{$set:{subServiceName: req.body.sub_service_name}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Sub-Services updated successfully",
          data:data
      });
    }
  });
}

exports.deleteSubServices = (req,res)=>{
    SubServices.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Sub-Services deleted successfully"
        });
      }
    });
  }
