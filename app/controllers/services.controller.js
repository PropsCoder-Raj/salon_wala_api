const db = require("../models");
const { services:Services } = db;

exports.getAllService = (req,res)=>{

    Services.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Services",
              data: data
          });
        }
    });
}

exports.getSingleService = (req,res)=>{

    Services.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Services",
              data: data
          });
        }
    });
}

exports.createService = (req, res) => {
    const service = new Services({
      serviceName: req.body.serviceName,
      thumbnail: req.body.thumbnail
    });
  
    service.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Service Created Successful",
            data:data
        });
    });
};

exports.updateService = (req,res)=>{
  Services.findByIdAndUpdate(req.params.id,{$set:{serviceName: req.body.serviceName,thumbnail: req.body.thumbnail}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Service updated successfully",
          data:data
      });
    }
  });
}

exports.deleteService = (req,res)=>{
    Services.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Service deleted successfully"
        });
      }
    });
  }
