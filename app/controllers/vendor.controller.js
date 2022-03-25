const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken,product:Product } = db;
var bcrypt = require("bcryptjs");

exports.getAllVendor = (req,res)=>{

  Role.find({name: { $in: "vendor" }},(err, roles) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      User.find({roles: { $in: roles[0]._id }},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: "Role must not be Empty" });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Vendor retrieved",
              data: data
          });
        }
      });
    }
  });
}


exports.updateVendor = (req,res)=>{
  User.findByIdAndUpdate(req.params.id,{$set:{salutation: req.body.salutation,firstName: req.body.firstName,lastName: req.body.lastName,email: req.body.email,mobile: req.body.mobile,dob: req.body.dob,gender: req.body.gender,shopName:req.body.shopName,shopMobile:req.body.shopMobile,shopAddress:req.body.shopAddress,shopPostalCode:req.body.shopPostalCode, address:req.body.address, pickupAddress:req.body.pickupAddress, pickupPostalCode: req.body.pickupPostalCode, commission: req.body.commission,timings:req.body.timings,
    usualTime:req.body.usualTime}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Vendor updated successfully"
      });
    }
  });
}

exports.singleVendor = (req,res)=>{
  User.findById(req.params.id,(err,data)=>{
    if(err){
        res.status(500).send({ status:"error", message: err });
    } else {
        res.status(200).send({
            status:"success",
            message : "Single Vendor retrieved",
            data: data
        });
    }
  });
}

exports.changeVendorPassword = (req,res)=>{
  User.findByIdAndUpdate(req.params.id,{$set:{password: bcrypt.hashSync(req.body.password, 8)}},(err,data)=>{
    if(err){
        res.status(500).send({ status:"error", message: err });
    } else {
        res.status(200).send({
            status:"success",
            message : "Password changed successfully"
        });
    }
  });
}


// Put updateWallet
exports.updateWallet = (req, res) => {
  User.findById(req.params.id,(err,data)=>{
    if(err){
        res.status(500).send({ status:"error", message: err });
    } else {
        let amount = req.body.amount;
        let dbbalance = data['wallet'];
        let newbalance = Number(dbbalance) + Number(amount);
        User.findByIdAndUpdate(req.params.id, {
          $set:
          {
              wallet: newbalance,
          }
        }, (err, data) => {
            if (err) {
                res.status(500).send({ status: "error", message: err });
            } else {
                res.status(200).send({
                    status: "success",
                    message: "Wallet updated successfully",
                });
            }
        });
    }
  });
}

// Put setWallet
exports.setWallet = (req, res) => {
  User.findById(req.params.id,(err,data)=>{
    if(err){
        res.status(500).send({ status:"error", message: err });
    } else {
        let amount = req.body.amount;
        User.findByIdAndUpdate(req.params.id, {
          $set:
          {
              wallet: amount,
          }
        }, (err, data) => {
            if (err) {
                res.status(500).send({ status: "error", message: err });
            } else {
                res.status(200).send({
                    status: "success",
                    message: "Wallet updated successfully",
                });
            }
        });
    }
  });
}