const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken,product:Product, bankDetails: BankDetails } = db;
var bcrypt = require("bcryptjs");

// Put Update Referral Code Apply Status
exports.updateUserReferralCode = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
      $set:
      {
          referralCodeApply: true
      }
  }, (err, data) => {
      if (err) {
          res.status(500).send({ status: "error", message: err });
      } else {
          res.status(200).send({
              status: "success",
              message: "User updated successfully",
          });
      }
  });
}

exports.findByEmail = (req, res) => {
  User.findOne({email: req.params.email }, (err, userData) => {

    if (err || userData === null) {
        res.status(200).send({ status: "error", message: err });
        return;
    }

    res.status(200).send({
      status: "success",
      message: "User Find",
      user: userData
    });

  });  
}

exports.getAllUsers = (req,res)=>{

  Role.find({name: { $in: "user" }},(err, roles) => {
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
              message : "All Users retrieved",
              data: data
          });
        }
      });
    }
  });
}

// Put updateBalance
exports.updateBalance = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
      $set:
      {
          balance: req.body.balance,
      }
  }, (err, data) => {
      if (err) {
          res.status(500).send({ status: "error", message: err });
      } else {
          res.status(200).send({
              status: "success",
              message: "Balance updated successfully",
          });
      }
  });
}

// Get Referral Code
exports.getReferralCode = (req, res) => {

  User.find({ code: req.params.code }, (err, data) => {
      if (err) {
          res.status(500).send({ status: "error", message: "Role must not be Empty" });
      } else {
          res.status(200).send({
              status: "success",
              message: "Referral Code Found",
              count: data.length,
              data: data
          });
      }
  });
}


exports.updateUser = (req,res)=>{
  User.findByIdAndUpdate(req.params.id,{$set:{salutation: req.body.salutation,firstName: req.body.firstName,lastName: req.body.lastName,email: req.body.email,mobile: req.body.mobile,dob: req.body.dob}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "User updated successfully"
      });
    }
  });
}

exports.singleUser = (req,res)=>{
  User.findById(req.params.id,(err,data)=>{
    if(err){
        res.status(500).send({ status:"error", message: err });
    } else {
        res.status(200).send({
            status:"success",
            message : "Single User retrieved",
            data: data
        });
    }
  });
}

exports.changeUserPassword = (req,res)=>{
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


exports.updateWishlist = (req,res)=>{
  User.findByIdAndUpdate(req.params.id,{$set:{wishlist: req.body.wishlist}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Wishlist updated successfully"
      });
    }
  });
}

exports.getWishlist = (req,res)=>{
  User.find({_id:req.params.id},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      Product.find({_id: { $in: data[0].wishlist }},(err, productData) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({
            status:"success",
            message : "Wishlist Products",
            data:productData
          });
        }
      });
    }
  });
}
 
exports.getCart = (req,res)=>{
  User.find({_id:req.params.id},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      Product.find({_id: { $in: data[0].cart }},(err, productData) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({
            status:"success",
            message : "Cart Products",
            data:productData
          });
        }
      });
    }
  });
}

exports.updateCart = (req,res)=>{
  User.findByIdAndUpdate(req.params.id,{$set:{cart: req.body.cart}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Cart updated successfully"
      });
    }
  });
}

exports.createVendor = (req, res) => {
  const user = new User({
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    shopName:req.body.shopName,
    shopMobile:req.body.shopMobile,
    shopEmail:req.body.shopEmail,
    shopAddress:req.body.shopAddress,
    shopPostalCode:req.body.shopPostalCode,
    pickupPostalCode:req.body.pickupPostalCode,
    pickupAddress:req.body.pickupAddress,
    commission: req.body.commission,
    wallet: 0,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const bankDetails = new BankDetails({
      bankName: req.body.bankName,
      bankIFSC: req.body.bankIFSC,
      accountNo: req.body.accountNo,
      accountType: req.body.accountType,
      user: user
    });

    bankDetails.save((err, data) => {
    });

    if (req.body.roles) {
      Role.find({name: { $in: req.body.roles }},(err, roles) => {
          if (err) {
            res.status(500).send({ status:"error", message: "Role must not be empty" });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({status:"success", message: "User was registered successfully!" });
          });
        }
      );
    } else {
      res.status(500).send({status:"error", message: "Role must not be empty" });
    }
  });
};

exports.createServiceVendor = (req, res) => {
  const user = new User({
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    shopName:req.body.shopName,
    shopMobile:req.body.shopMobile,
    shopEmail:req.body.shopEmail,
    shopAddress:req.body.shopAddress,
    shopPostalCode:req.body.shopPostalCode,
    lat:req.body.lat,
    long:req.body.long,
    password: bcrypt.hashSync(req.body.password, 8),
    commission: req.body.commission,
    wallet: 0,
    timings:req.body.timings,
    usualTime:req.body.usualTime
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const bankDetails = new BankDetails({
      bankName: req.body.bankName,
      bankIFSC: req.body.bankIFSC,
      accountNo: req.body.accountNo,
      accountType: req.body.accountType,
      user: user
    });

    bankDetails.save((err, data) => {
    });

    if (req.body.roles) {
      Role.find({name: { $in: req.body.roles }},(err, roles) => {
          if (err) {
            res.status(500).send({ status:"error", message: "Role must not be empty" });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({status:"success", message: "User was registered successfully!" });
          });
        }
      );
    } else {
      res.status(500).send({status:"error", message: "Role must not be empty" });
    }
  });
};