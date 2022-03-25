const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken } = db;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    dob: req.body.dob,
    code: req.body.code,
    balance: 0,
    password: bcrypt.hashSync(req.body.password, 8),
    createdAt: new Date(),
    referralCodeApply: false,
    provider: "Email"
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: "Role must not be empty" });
          return;
        }

        user.roles = roles.map(role => role._id);
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ status: 'success', message: "User was registered successfully!" });
        });
      }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: "Role must not be empty" });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ status: 'success', message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signUpGoogle = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, userData) => {
    if (err || userData === null) {

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        code: req.body.code,
        balance: 0,
        createdAt: new Date(),
        referralCodeApply: false,
        provider: "Google"
      });

      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          console.log("2 Message : " + err);
          return;
        }

        if (req.body.roles) {
          Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
            if (err) {
              res.status(500).send({ message: "Role must not be empty" });
              console.log("3 Message : " + err);
              return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                console.log("4 Message : " + err);
                return;
              }

              User.findOne({
                email: req.body.email,
              }).populate("roles", "-__v")
                .exec(async (err, _user) => {
                  let token = jwt.sign({ id: _user.id }, config.secret, {
                    expiresIn: config.jwtExpiration,
                  });

                  let authorities = [];

                  for (let i = 0; i < _user.roles.length; i++) {
                    authorities.push("ROLE_" + _user.roles[i].name.toUpperCase());
                  }

                  res.status(200).send({
                    status: "success",
                    message: "Login successfully",
                    data: {
                      id: user._id,
                      email: user.email,
                      roles: authorities,
                      accessToken: token,
                    }
                  });
                });
            });
          }
          );
        }

      });
    }

  })
};


exports.signUpFacebook = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, userData) => {
    if (err || userData === null) {

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        code: req.body.code,
        balance: 0,
        createdAt: new Date(),
        referralCodeApply: false,
        provider: "Facebook"
      });

      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          console.log("2 Message : " + err);
          return;
        }

        if (req.body.roles) {
          Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
            if (err) {
              res.status(500).send({ message: "Role must not be empty" });
              console.log("3 Message : " + err);
              return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                console.log("4 Message : " + err);
                return;
              }

              User.findOne({
                email: req.body.email,
              }).populate("roles", "-__v")
                .exec(async (err, _user) => {
                  let token = jwt.sign({ id: _user.id }, config.secret, {
                    expiresIn: config.jwtExpiration,
                  });

                  let authorities = [];

                  for (let i = 0; i < _user.roles.length; i++) {
                    authorities.push("ROLE_" + _user.roles[i].name.toUpperCase());
                  }

                  res.status(200).send({
                    status: "success",
                    message: "Login successfully",
                    data: {
                      id: user._id,
                      email: user.email,
                      roles: authorities,
                      accessToken: token,
                    }
                  });
                });
            });
          }
          );
        }

      });
    }

  })
};

exports.signInProvider = (req, res) => {
  User.findOne({
    email: req.body.email
  }).populate("roles", "-__v")
    .exec(async (err, _user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!_user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let token = jwt.sign({ id: _user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let authorities = [];

      for (let i = 0; i < _user.roles.length; i++) {
        authorities.push("ROLE_" + _user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        status: "success",
        message: "Login successfully",
        data: {
          id: _user._id,
          email: _user.email,
          roles: authorities,
          accessToken: token,
        }
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });


      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        status: "success",
        message: "Login successfully",
        data: {
          id: user._id,
          email: user.email,
          roles: authorities,
          accessToken: token,
        }
      });
    });
};

exports.vendorSignUp = (req, res) => {
  const user = new User({
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    shopName: req.body.shopName,
    shopMobile: req.body.shopMobile,
    shopAddress: req.body.shopAddress,
    shopPostalCode: req.body.shopPostalCode,
    password: bcrypt.hashSync(req.body.password, 8),
    createdAt: new Date()
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: "Role must not be empty" });
          return;
        }

        user.roles = roles.map(role => role._id);
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: "Role must not be empty" });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.ServiceVendorSignUp = (req, res) => {
  const user = new User({
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    shopName: req.body.shopName,
    shopMobile: req.body.shopMobile,
    shopAddress: req.body.shopAddress,
    shopPostalCode: req.body.shopPostalCode,
    password: bcrypt.hashSync(req.body.password, 8),
    createdAt: new Date()
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: "Role must not be empty" });
          return;
        }

        user.roles = roles.map(role => role._id);
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: "Role must not be empty" });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};