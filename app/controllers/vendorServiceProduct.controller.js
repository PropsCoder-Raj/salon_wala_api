const db = require("../models");
const { serviceProduct: ServiceProduct, vendorServiceProduct: VendorServiceProduct, user: User } = db;

exports.getAllProduct = (req, res) => {

    VendorServiceProduct.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Products",
                data: data
            });
        }
    });
}


// Get Service Products
exports.getUserVendorServiceProducts = (req, res) => {
    // Validate request
    if (!req.params.id) {
        res.status(400).send({ message: "User Id Required" });
        return;
    }

    User.findById(req.params.id, (err, userData) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            VendorServiceProduct.find({ user: userData }, (err, OrdersData) => {
                if (err) {
                    res.status(500).send({ status: "error", message: err });
                } else {
                    res.status(200).send({ status: "success", data: OrdersData });
                }
            });
        }
    });
}

exports.getSingleProduct = (req, res) => {

    VendorServiceProduct.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Product",
                data: data
            });
        }
    });
}

exports.createProduct = (req, res) => {

    ServiceProduct.find({ _id: req.body.serviceProductId }, (err, serviceProductData) => {
        if (!req.body.userId) {
            res.status(400).send({ message: "Service Product Id Required" });
            return;
        }
        User.find({ _id: req.body.userId }, (err, userData) => {
            if (!req.body.userId) {
                res.status(400).send({ message: "User Id Required" });
                return;
            }
            const vendorServiceProduct = new VendorServiceProduct({
                time: req.body.time,
                price: req.body.price,
                serviceProduct: serviceProductData,
                user: userData[0]
            });

            vendorServiceProduct.save((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send({
                    status: "success",
                    message: "Vendor Services Product Created Successfully"
                });

            });
        });

    });

};

exports.updateProduct = (req, res) => {
    VendorServiceProduct.findByIdAndUpdate(req.params.id, {
        $set: {
            time: req.body.time,
            price: req.body.price,
        }
    }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Vendor Product updated successfully"
            });
        }
    });
}

exports.deleteProduct = (req, res) => {
    VendorServiceProduct.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Product deleted successfully"
            });
        }
    });
}

exports.updateProductStatus = (req, res) => {
    VendorServiceProduct.findByIdAndUpdate(req.params.id, { $set: { stauts: req.body.status } }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Product status updated successfully"
            });
        }
    });
}

exports.getFeaturedProduct = (req, res) => {

    VendorServiceProduct.find({ featured: 1 }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Product",
                data: data
            });
        }
    });
}

exports.getCategoriesWiseProduct = (req, res) => {

    VendorServiceProduct.find({ category: { $in: req.params.id } }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Category Wise Product",
                data: data
            });
        }
    });
}