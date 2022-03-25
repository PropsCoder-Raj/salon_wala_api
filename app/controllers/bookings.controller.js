const db = require("../models");
const { bookings: Bookings, user: User } = db;

exports.createBookings = (req, res) => {
    User.findById(req.body.id, (err, userData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            const bookings = new Bookings({
                paymentStatus: req.body.paymentStatus,
                couponCode: req.body.couponCode,
                discountAmount: req.body.discountAmount,
                bookingTotal: req.body.bookingTotal,
                subTotal: req.body.subTotal,
                services: req.body.services,
                slot: req.body.slot,
                bookingsComments: req.body.bookingsComments,
                bookingDate: req.body.bookingDate,
                user: userData,
            });

            bookings.save((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send({
                    status: "success",
                    message: "Bookings Created Successfully",
                    bookingdata : data
                });

            });
        }
    });        
};

exports.getBookingsAll = (req, res) => {
    Bookings.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Bookings",
                count: data.length,
                data: data
            });
        }
    }).sort({createdAt: 'desc'});
}

// Get Bookings
exports.getUserBookings = (req, res) => {
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
            Bookings.find({ user: userData }, (err, BookingsData) => {
                if (err) {
                    res.status(500).send({ status: "error", message: err });
                } else {
                    res.status(200).send({ status: "success", data: BookingsData });
                }
            }).sort({createdAt: 'desc'});
        }
    });
}

// Get Bookings
exports.getSingleBookings = (req, res) => {
    // Validate request
    if (!req.params.id) {
        res.status(400).send({ message: "Booking Id Required" });
        return;
    }

    Bookings.findById(req.params.id, (err, BookingsData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({ status: "success", data: BookingsData });
        }
    });
}