const db = require("../models");
const Orders = db.orders;
const User = db.user;


// Create Orders
exports.createOrder = (req, res) => {
    User.findById(req.body.id, (err, userData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            const orders = new Orders({
                paymentStatus: req.body.paymentStatus,
                fulfillmentStatus: req.body.fulfillmentStatus,
                couponCode: req.body.couponCode,
                discountAmount: req.body.discountAmount,
                discountPercentage: req.body.discountPercentage,
                orderComments: req.body.orderComments,
                total: req.body.total,
                additionalInfo: req.body.additionalInfo,
                shippingPerson: req.body.shippingPerson,
                items: req.body.items,
                orderId: req.body.orderId,
                createdAt: new Date(),
                user: userData
            });
            orders.save((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
        
                res.status(200).send({
                    status: "success",
                    orderData: data
                });
            });
        }
    });
};

// Get All Latest
exports.getAllOrdersLatest = (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Orders.find({ createdAt: { $gte: startOfToday } }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Orders",
                count: data.length,
                data: data
            });
        }
    });
}

exports.getOrdersAll = (req, res) => {
    Orders.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Orders",
                count: data.length,
                data: data
            });
        }
    }).sort({createdAt: 'desc'});
}

// Get Orders
exports.getUserOrders = (req, res) => {
    // Validate request
    if (!req.params.id) {
        res.status(400).send({ message: "User Id Required" });
        return;
    }

    User.findById(req.params.id, (err, userData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            // res.status(500).send({ status: "success", message: userData});
            Orders.find({ user: userData }, (err, OrdersData) => {
                if (err) {
                    res.status(500).send({ status: "error", message: err });
                } else {
                    res.status(200).send({ status: "success", data: OrdersData });
                }
            }).sort({createdAt: 'desc'});
        }
    });
}

// Get Orders
exports.getSingleOrders = (req, res) => {
    // Validate request
    if (!req.params.id) {
        res.status(400).send({ message: "Order Id Required" });
        return;
    }

    Orders.findById(req.params.id, (err, OrdersData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({ status: "success", data: OrdersData });
        }
    });
}