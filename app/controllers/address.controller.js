const db = require("../models");
const { address:Address } = db;


exports.getUserAddress = (req,res)=>{

    Address.find({user:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Address",
              data: data
          });
        }
    });
}


exports.createAddress = (req, res) => {
    const address = new Address({
        name: req.body.name,
        companyName: req.body.companyName,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        postalCode: req.body.postalCode,
        state: req.body.state,
        phone: req.body.phone,
        user:req.body.user
    });
  
    address.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Address Created Successful"
        });
    });
};

exports.updateAddress = (req,res)=>{
  Address.findByIdAndUpdate(req.params.id,{$set:{name: req.body.name,companyName: req.body.companyName,street: req.body.street,city: req.body.city,country: req.body.country,postalCode: req.body.postalCode,state: req.body.state,phone: req.body.phone}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Address updated successfully"
      });
    }
  });
}


exports.deleteAddress = (req,res)=>{
    Address.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Address deleted successfully"
        });
      }
    });
  }
