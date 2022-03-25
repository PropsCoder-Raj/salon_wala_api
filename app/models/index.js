const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.category = require("./category.model");
db.subcategory = require("./subcategory.model");
db.subsubcategory = require("./subsubcategory.model");
db.coupon = require("./coupon.model");
db.tax = require("./tax.model");
db.product = require("./product.model");
db.banner = require("./banner.model");
db.address = require("./address.model");
db.orders = require("./orders.model");
db.ratings = require("./ratings.model");
db.bankDetails = require("./bankDetails.model");
db.transaction = require("./transaction.model");

db.bookings = require("./bookings.model");
db.contacts = require("./contacts.model");
db.settings = require("./settings.model");
db.services = require("./services.model");
db.subservices = require("./subservices.model");
db.subsubservices = require("./subsubservices.model");
db.serviceProduct = require("./serviceProduct.model");
db.vendorServiceProduct = require("./vendorServiceProduct.model");

db.city = require("./city.model");

db.ROLES = ["user", "admin"];

module.exports = db;