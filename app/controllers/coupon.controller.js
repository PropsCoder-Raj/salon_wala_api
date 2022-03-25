const db = require("../models");
const { coupon:Coupon } = db;

exports.getAllCoupon = (req,res)=>{

    Coupon.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Coupons",
              data: data
          });
        }
    });
}

exports.getSingleCoupon = (req,res)=>{

    Coupon.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Coupon",
              data: data
          });
        }
    });
}

exports.getCouponByCode = (req,res)=>{

    Coupon.find({code:req.params.code},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Coupon",
              data: data
          });
        }
    });
}

exports.createCoupon = (req, res) => {
    const coupon = new Coupon({
        name: req.body.name,
        code: req.body.code,
        status: req.body.status,
        discount: req.body.discount,
        amountLimit: req.body.amountLimit,
        usesLimit: req.body.usesLimit,
        applicationLimit: req.body.applicationLimit
    });
  
    coupon.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Coupon Created Successful"
        });
    });
};

exports.updateCoupon = (req,res)=>{
  Coupon.findByIdAndUpdate(req.params.id,{$set:{name: req.body.name,code: req.body.code,status: req.body.status,discount: req.body.discount,amountLimit: req.body.amountLimit,usesLimit: req.body.usesLimit,applicationLimit: req.body.applicationLimit}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Coupon updated successfully"
      });
    }
  });
}

exports.updateCouponStatus = (req,res)=>{
    Coupon.findByIdAndUpdate(req.params.id,{$set:{stauts:req.body.status}},(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Coupon status updated successfully"
        });
      }
    });
  }

exports.deleteCoupon = (req,res)=>{
    Coupon.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Coupon deleted successfully"
        });
      }
    });
  }
