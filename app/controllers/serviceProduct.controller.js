const db = require("../models");
const { serviceProduct: ServiceProduct, services: Services, subservices: SubServices, user: User } = db;

exports.getAllProduct = (req, res) => {

  ServiceProduct.find({}, (err, data) => {
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

exports.getSingleProduct = (req, res) => {

  ServiceProduct.find({ _id: req.params.id }, (err, data) => {
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

  const serviceProduct = new ServiceProduct({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    status: req.body.status,
    media: req.body.media
  });

  serviceProduct.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      status: "success",
      message: "Services Product Created Successfully"
    });

  });

};

exports.updateProduct = (req, res) => {

  ServiceProduct.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      status: req.body.status,
      media: req.body.media
    }
  }, (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "Services Product updated successfully"
      });
    }
  });
}

exports.deleteProduct = (req, res) => {
  ServiceProduct.findByIdAndDelete(req.params.id, (err, data) => {
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
  ServiceProduct.findByIdAndUpdate(req.params.id, { $set: { stauts: req.body.status } }, (err, data) => {
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

  ServiceProduct.find({ featured: 1 }, (err, data) => {
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

  ServiceProduct.find({ category: { $in: req.params.id } }, (err, data) => {
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