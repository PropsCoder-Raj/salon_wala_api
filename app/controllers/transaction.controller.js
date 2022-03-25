const db = require("../models");
const Transaction = db.transaction;
const User = db.user;
const Orders = db.orders;
const VendorServiceProduct = db.vendorServiceProduct;
const Bookings = db.bookings;
const Product = db.product;

exports.getAllTransaction = (req, res) => {
    Transaction.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Transaction",
                data: data
            });
        }
    });
}

exports.getVendorTransaction = (req, res) => {
    Transaction.find({ user: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Transaction",
                data: data
            });
        }
    });
}

exports.createTransaction = (req, res) => {
    // Validate request
    if (!req.params.cid) {
        res.status(400).send({ message: "User Id Required" });
        return;
    }

    let usersArr = [];


    User.findById(req.params.cid, (err, customerData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {

            this.usersArr = customerData;
            if(req.body.orderId !== '' && req.body.productId !== '' ){
                Orders.findById(req.body.orderId, (err, ordersData) => {
                    if (err) {
                        res.status(500).send({ status: "error", message: err });
                    } else {

                        Product.findById(req.body.productId, (err, productsData) => {
                            if (err) {
                                res.status(500).send({ status: "error", message: err });
                            } else {
                                const transaction = new Transaction({
                                    amount: req.body.amount,
                                    type: req.body.type,
                                    transactionType: req.body.transactionType,
                                    message: req.body.message,
                                    orderId: ordersData,
                                    productId: productsData,
                                    user: customerData,
                                    createdAt: new Date()
                                });
                                transaction.save((err, data) => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }

                                    res.status(200).send({
                                        status: "success",
                                        message: "Transaction Created Successful",
                                        data: data
                                    });
                                });
                            }
                        });
                    }
                });
            }else{
                const transaction = new Transaction({
                    amount: req.body.amount,
                    type: req.body.type,
                    transactionType: req.body.transactionType,
                    message: req.body.message,
                    orderId: null,
                    productId: null,
                    user: customerData,
                    createdAt: new Date()
                });
                transaction.save((err, data) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.status(200).send({
                        status: "success",
                        message: "Transaction Created Successful",
                        data: data
                    });
                });
            }
        }
    });
};


exports.createTransactionReferralCodeThrough = (req, res) => {
    // Validate request
    if (!req.params.cid) {
        res.status(400).send({ message: "User Id Required" });
        return;
    } 

    let usersArr = [];


    User.findById(req.params.cid, (err, customerData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {

            this.usersArr = customerData;
            console.log(req.body);

            Orders.findById(req.body.orderId, (err, ordersData) => {
                if (err) {
                    res.status(500).send({ status: "error", message: err });
                } else {
                    const transaction = new Transaction({
                        amount: req.body.amount,
                        type: req.body.type,
                        transactionType: req.body.transactionType,
                        message: req.body.message,
                        orderId: ordersData,
                        user: customerData
                    });
                    transaction.save((err, data) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                
                        res.status(200).send({
                            status:"success",
                            message : "Transaction Created Successful",
                            data: data
                        });
                    });
                }
            });
        }
    });
};

exports.createTransactionBookingsThrough = (req, res) => {
    // Validate request
    if (!req.params.cid) {
        res.status(400).send({ message: "User Id Required" });
        return;
    }

    let usersArr = [];


    User.findById(req.params.cid, (err, customerData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {

            this.usersArr = customerData;
            if(req.body.bookingId !== '' && req.body.serviceId !== '' ){
                Bookings.findById(req.body.bookingId, (err, bookingDats) => {
                    if (err) {
                        res.status(500).send({ status: "error", message: err });
                    } else {

                        VendorServiceProduct.findById(req.body.serviceId, (err, serviceData) => {
                            if (err) {
                                res.status(500).send({ status: "error", message: err });
                            } else {
                                const transaction = new Transaction({
                                    amount: req.body.amount,
                                    type: req.body.type,
                                    transactionType: req.body.transactionType,
                                    message: req.body.message,
                                    bookingId: bookingDats,
                                    serviceId: serviceData,
                                    user: customerData,
                                    createdAt: new Date()
                                });
                                transaction.save((err, data) => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }

                                    res.status(200).send({
                                        status: "success",
                                        message: "Transaction Created Successful",
                                        data: data
                                    });
                                });
                            }
                        });
                    }
                });
            }else{
                const transaction = new Transaction({
                    amount: req.body.amount,
                    type: req.body.type,
                    transactionType: req.body.transactionType,
                    message: req.body.message,
                    bookingId: null,
                    serviceId: null,
                    user: customerData,
                    createdAt: new Date()
                });
                transaction.save((err, data) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.status(200).send({
                        status: "success",
                        message: "Transaction Created Successful",
                        data: data
                    });
                });
            }
        }
    });
};