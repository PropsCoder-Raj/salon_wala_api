const db = require("../models");
const { city:City } = db;
var bcrypt = require("bcryptjs");

exports.getAllCity = (req,res)=>{

    City.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All City",
              data: data
          });
        }
    });
}

exports.getSingleCity = (req,res)=>{

    City.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "City",
              data: data
          });
        }
    });
}

exports.createCity = (req, res) => {
    const city = new City({
      cityName: req.body.city_name,
      thumbnail: req.body.thumbnail
    });
  
    city.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "City Created Successfully",
            data:data
        });
    });
};

exports.updateCity = (req,res)=>{
  City.findByIdAndUpdate(req.params.id,{$set:{cityName: req.body.city_name,thumbnail: req.body.thumbnail}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "City updated successfully",
          data:data
      });
    }
  });
}

exports.deleteCity = (req,res)=>{
    City.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "City Deleted successfully"
        });
      }
    });
  }
