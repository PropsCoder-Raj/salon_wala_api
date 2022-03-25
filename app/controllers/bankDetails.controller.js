const db = require("../models");
const { bankDetails: BankDetails, user: User } = db;


exports.getUserBankDetails = (req, res) => {

    BankDetails.find({ user: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "BankDetails",
                data: data
            });
        }
    });
}


exports.createBankDetails = (req, res) => {

    User.find({ _id: req.params.id }, (err, userData) => {
        if (!req.params.id) {
          res.status(400).send({ message: "Vendor Id Required" });
          return;
        }    

        const bankDetails = new BankDetails({
            bankName: req.body.bankName,
            bankIFSC: req.body.bankIFSC,
            accountNo: req.body.accountNo,
            accountType: req.body.accountType,
            user: userData[0]
        });

        bankDetails.save((err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({
                status: "success",
                message: "Bank Details Created Successful"
            });
        });
    });    
};

exports.updateBankDetails = (req, res) => {
    BankDetails.findByIdAndUpdate(req.params.id, {
        $set: {
            bankName: req.body.bankName,
            bankIFSC: req.body.bankIFSC,
            accountNo: req.body.accountNo,
            accountType: req.body.accountType,
        }
    }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Bank Details updated successfully"
            });
        }
    });
}