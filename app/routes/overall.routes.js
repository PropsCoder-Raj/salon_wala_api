const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
const categoriesController = require("../controllers/categories.controller");
const cityController = require("../controllers/city.controller");
const subCategoriesController = require("../controllers/subcategory.controller");
const subSubCategoriesController = require("../controllers/subsubcategory.controller");
const servicesController = require("../controllers/services.controller");
const subServicesController = require("../controllers/subservices.controller");
const subSubServicesController = require("../controllers/subsubservices.controller");
const couponController = require("../controllers/coupon.controller");
const taxController = require("../controllers/tax.controller");
const commanController = require("../controllers/comman.controller");
const productController = require("../controllers/product.controller");
const serviceProductController = require("../controllers/serviceProduct.controller");
const vendorServiceProductController = require("../controllers/vendorServiceProduct.controller");
const bannerController = require("../controllers/banner.controller");
const contactsController = require("../controllers/contact.controller");
const addressController = require("../controllers/address.controller");
const vendorController = require("../controllers/vendor.controller");
const serviceVendorController = require("../controllers/serviceVendor.controller");
const ordersController = require("../controllers/orders.controller");
const ratingsController = require("../controllers/ratings.controller");
const bankDetailsController = require("../controllers/bankDetails.controller");
const transactionController = require("../controllers/transaction.controller");
const bookingsController = require("../controllers/bookings.controller");
const settingsController = require("../controllers/settings.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //settings
  app.get("/api/settings", [authJwt.verifyToken], settingsController.getSettings);
  app.post("/api/settings/refer/:id", [authJwt.verifyToken], settingsController.saveRefer);
  app.post("/api/settings/cartcheckout/:id", [authJwt.verifyToken], settingsController.saveCartcheckout);

    // Ratings
    app.get("/api/ratings/:id", ratingsController.getSingleRatings);
    app.get("/api/ratings/product/:id", ratingsController.getRatingsProcutWise);
    app.get("/api/ratings/order/:id", ratingsController.getRatingsOrderId);
    app.post("/api/ratings/:id", [authJwt.verifyToken],ratingsController.createRatings);
    app.put("/api/ratings/:id", [authJwt.verifyToken],ratingsController.updateRatings);

    // User Controller
    
    app.put("/api/balance/:id", [authJwt.verifyToken],userController.updateBalance);
    app.put("/api/user/referral-update/:id", userController.updateUserReferralCode);
    app.get("/api/user/refferal/:code",[authJwt.verifyToken],userController.getReferralCode);
    app.get("/api/user/all",[authJwt.verifyToken],userController.getAllUsers);
    app.get("/api/user/email/:email",userController.findByEmail);
    app.put("/api/user/update/:id",[authJwt.verifyToken],userController.updateUser);
    app.get("/api/user/:id",[authJwt.verifyToken],userController.singleUser);
    app.put("/api/user/change-password/:id",[authJwt.verifyToken],userController.changeUserPassword);
    app.put("/api/user/wishlist/:id",[authJwt.verifyToken],userController.updateWishlist);
    app.get("/api/user/wishlist/:id",[authJwt.verifyToken],userController.getWishlist);
    app.put("/api/user/cart/:id",[authJwt.verifyToken],userController.updateCart);
    app.get("/api/user/cart/:id",[authJwt.verifyToken],userController.getCart);
    app.get("/api/user/address/:id",[authJwt.verifyToken],addressController.getUserAddress);
    app.put("/api/user/address/:id",[authJwt.verifyToken],addressController.updateAddress);
    app.post("/api/user/address",[authJwt.verifyToken],addressController.createAddress);
    app.delete("/api/user/address/:id",[authJwt.verifyToken],addressController.deleteAddress);



    // Categories Controller
    app.get("/api/categories",categoriesController.getAllCategories);
    app.get("/api/category/:id",categoriesController.getSingleCategory);
    app.post("/api/category",[authJwt.verifyToken],categoriesController.createCategory);
    app.put("/api/category/:id",[authJwt.verifyToken],categoriesController.updateCategory);
    app.delete("/api/category/:id",[authJwt.verifyToken],categoriesController.deleteCategory);

    // Sub-Categories Controller
    app.get("/api/sub-categories",subCategoriesController.getAllSubCategories);
    app.get("/api/sub-category/:id",subCategoriesController.getSingleSubCategory);
    app.get("/api/sub-category/category/:id",subCategoriesController.getSubCategoriesByCategoryId);
    app.post("/api/sub-category",[authJwt.verifyToken],subCategoriesController.createSubCategory);
    app.put("/api/sub-category/:id",[authJwt.verifyToken],subCategoriesController.updateSubCategory);
    app.delete("/api/sub-category/:id",[authJwt.verifyToken],subCategoriesController.deleteSubCategory);

    // Sub Sub-Categories Controller
    app.get("/api/sub-sub-categories",subSubCategoriesController.getAllSubSubCategories);
    app.get("/api/sub-sub-category/:id",subSubCategoriesController.getSingleSubSubCategory);
    app.get("/api/sub-sub-category/sub-category/:id",subSubCategoriesController.getSubSubCategoriesBySubCategoryId);
    app.post("/api/sub-sub-category",[authJwt.verifyToken],subSubCategoriesController.createSubSubCategory);
    app.put("/api/sub-sub-category/:id",[authJwt.verifyToken],subSubCategoriesController.updateSubSubCategory);
    app.delete("/api/sub-sub-category/:id",[authJwt.verifyToken],subSubCategoriesController.deleteSubSubCategory);
    app.delete("/api/sub-sub-category/category/:id",[authJwt.verifyToken],subSubCategoriesController.deleteSubSubCategoryByCategoryId);

    // Coupons
    app.get("/api/coupon",couponController.getAllCoupon);
    app.get("/api/coupon/:id",couponController.getSingleCoupon);
    app.get("/api/coupon-by-code/:code",couponController.getCouponByCode);
    app.post("/api/coupon",[authJwt.verifyToken],couponController.createCoupon);
    app.put("/api/coupon/:id",[authJwt.verifyToken],couponController.updateCoupon);
    app.put("/api/coupon-status/:id",[authJwt.verifyToken],couponController.updateCouponStatus);
    app.delete("/api/coupon/:id",[authJwt.verifyToken],couponController.deleteCoupon);

    // Tax Controller
    app.get("/api/tax",[authJwt.verifyToken],taxController.getAllTax);
    app.get("/api/tax/:id",[authJwt.verifyToken],taxController.getSingleTax);
    app.post("/api/tax",[authJwt.verifyToken],taxController.createTax);
    app.put("/api/tax/:id",[authJwt.verifyToken],taxController.updateTax);
    app.delete("/api/tax/:id",[authJwt.verifyToken],taxController.deleteTax);

    // Comman Controller
    app.post("/api/upload", [authJwt.verifyToken],commanController.uploadFile);
    app.get("/api/retrieve/:file",commanController.retrieveFile);

    // Product Controller
    app.get("/api/product",productController.getAllProduct);
    app.get("/api/product/subcategory/:id",productController.getAllProductSubSubCategory);
    app.get("/api/product/vendor/:id",productController.getAllProductVenderWise);
    app.get("/api/product-featured",productController.getFeaturedProduct);
    app.get("/api/product/:id",productController.getSingleProduct);
    app.get("/api/product/name/:name",productController.getSingleProductName);
    app.get("/api/product-category/:id",productController.getCategoriesWiseProduct);
    app.post("/api/product", [authJwt.verifyToken],productController.createProduct);
    app.put("/api/product/:id",[authJwt.verifyToken],productController.updateProduct);
    app.put("/api/product-status/:id",[authJwt.verifyToken],productController.updateProductStatus);
    app.delete("/api/product/:id",[authJwt.verifyToken],productController.deleteProduct);

    // Banner Controller
    app.get("/api/banner",bannerController.getAllBanner);
    app.get("/api/banner/:id",bannerController.getSingleBanner);    
    app.post("/api/banner", [authJwt.verifyToken],bannerController.createBanner);
    app.put("/api/banner/:id",[authJwt.verifyToken],bannerController.updateBanner);
    
    // Contacts Controller
    app.get("/api/contacts",contactsController.getAllContacts);
    app.get("/api/contacts/:id",contactsController.getSingleContacts);    
    app.post("/api/contacts", [authJwt.verifyToken],contactsController.createContacts);
    app.put("/api/contacts/:id",[authJwt.verifyToken],contactsController.updateStatus);

    // Services Controller
    app.get("/api/services",servicesController.getAllService);
    app.get("/api/service/:id",servicesController.getSingleService);
    app.post("/api/service",[authJwt.verifyToken],servicesController.createService);
    app.put("/api/service/:id",[authJwt.verifyToken],servicesController.updateService);
    app.delete("/api/service/:id",[authJwt.verifyToken],servicesController.deleteService);

    // Sub-Services Controller
    app.get("/api/sub-services",subServicesController.getAllSubServices);
    app.get("/api/sub-services/:id",subServicesController.getSingleSubServices);
    app.get("/api/sub-services/services/:id",subServicesController.getSubServicesByServicesId);
    app.post("/api/sub-services",[authJwt.verifyToken],subServicesController.createSubServices);
    app.put("/api/sub-services/:id",[authJwt.verifyToken],subServicesController.updateSubServices);
    app.delete("/api/sub-services/:id",[authJwt.verifyToken],subServicesController.deleteSubServices);

    // Sub Sub-Services Controller
    app.get("/api/sub-sub-services",subSubServicesController.getAllSubSubServices);
    app.get("/api/sub-sub-services/:id",subSubServicesController.getSingleSubSubServices);
    app.get("/api/sub-sub-services/sub-services/:id",subSubServicesController.getSubSubServicesBySubServicesId);
    app.post("/api/sub-sub-services",[authJwt.verifyToken],subSubServicesController.createSubSubServices);
    app.put("/api/sub-sub-services/:id",[authJwt.verifyToken],subSubServicesController.updateSubSubServices);
    app.delete("/api/sub-sub-services/:id",[authJwt.verifyToken],subSubServicesController.deleteSubSubServices);
    app.delete("/api/sub-sub-services/services/:id",[authJwt.verifyToken],subSubServicesController.deleteSubSubServicesByServicesId);

    // Service Product Controller
    app.get("/api/service/product/all",serviceProductController.getAllProduct);
    app.get("/api/service/product-featured/featured",serviceProductController.getFeaturedProduct);
    app.get("/api/service/product/single/:id",serviceProductController.getSingleProduct);
    app.get("/api/service/product-category/category/:id",serviceProductController.getCategoriesWiseProduct);
    app.post("/api/service/product/create", [authJwt.verifyToken],serviceProductController.createProduct);
    app.put("/api/service/product/update/:id",[authJwt.verifyToken],serviceProductController.updateProduct);
    app.put("/api/service/product-status/status/:id",[authJwt.verifyToken],serviceProductController.updateProductStatus);
    app.delete("/api/service/product/delete/:id",[authJwt.verifyToken],serviceProductController.deleteProduct);

    // Vendor Service Product Controller
    app.get("/api/vendor-service/product/all",vendorServiceProductController.getAllProduct);
    app.get("/api/vendor-service/product-featured/featured",vendorServiceProductController.getFeaturedProduct);
    app.get("/api/vendor-service/product/single/:id",vendorServiceProductController.getSingleProduct);
    app.get("/api/vendor-service/product/user/:id",vendorServiceProductController.getUserVendorServiceProducts);
    app.get("/api/vendor-service/product-category/category/:id",vendorServiceProductController.getCategoriesWiseProduct);
    app.post("/api/vendor-service/product/create", [authJwt.verifyToken],vendorServiceProductController.createProduct);
    app.put("/api/vendor-service/product/update/:id",[authJwt.verifyToken],vendorServiceProductController.updateProduct);
    app.put("/api/vendor-service/product-status/status/:id",[authJwt.verifyToken],vendorServiceProductController.updateProductStatus);
    app.delete("/api/vendor-service/product/delete/:id",[authJwt.verifyToken],vendorServiceProductController.deleteProduct);

    // Vendor Controller
    app.put("/api/vendor/wallet/:id",vendorController.updateWallet);
    app.put("/api/vendor-wallet/:id",vendorController.setWallet);
    app.get("/api/vendor/all",vendorController.getAllVendor);
    app.post("/api/vendor/create",[authJwt.verifyToken],userController.createVendor);
    app.put("/api/vendor/update/:id",[authJwt.verifyToken],vendorController.updateVendor);
    app.get("/api/vendor/:id",vendorController.singleVendor);
    app.put("/api/vendor/change-password/:id",[authJwt.verifyToken],vendorController.changeVendorPassword);

    // Service Vendor Controller
    app.get("/api/service/vendor/all",serviceVendorController.getAllVendor);
    app.post("/api/service/vendor/create",[authJwt.verifyToken],userController.createServiceVendor);
    app.put("/api/service/vendor/update/:id",[authJwt.verifyToken],serviceVendorController.updateVendor);
    app.get("/api/service/vendor/:id",serviceVendorController.singleVendor);
    app.put("/api/service/vendor/change-password/:id",[authJwt.verifyToken],serviceVendorController.changeVendorPassword);
    app.get("/api/service/vendor-by-city/:city",serviceVendorController.getVendorByCity);

    // Orders
    app.get("/api/order/:id", [authJwt.verifyToken], ordersController.getUserOrders);
    app.get("/api/order-single/:id", [authJwt.verifyToken], ordersController.getSingleOrders);
    app.get("/api/order-all", [authJwt.verifyToken], ordersController.getOrdersAll);
    app.get("/api/order-latest", [authJwt.verifyToken], ordersController.getAllOrdersLatest);
    app.post("/api/order", [authJwt.verifyToken], ordersController.createOrder);

    // bookings
    app.get("/api/bookings/:id", [authJwt.verifyToken], bookingsController.getUserBookings);
    app.get("/api/bookings-single/:id", [authJwt.verifyToken], bookingsController.getSingleBookings);
    app.get("/api/bookings-all", [authJwt.verifyToken], bookingsController.getBookingsAll);
    app.post("/api/bookings", [authJwt.verifyToken], bookingsController.createBookings);

    
    app.post("/api/bank/:id", [authJwt.verifyToken], bankDetailsController.createBankDetails);
    app.get("/api/bank/user/:id", [authJwt.verifyToken], bankDetailsController.getUserBankDetails);
    app.put("/api/bank/:id", [authJwt.verifyToken], bankDetailsController.updateBankDetails);


    // Transaction
    app.get("/api/transaction", [authJwt.verifyToken],transactionController.getAllTransaction);
    app.get("/api/transaction/vendor/:id", [authJwt.verifyToken],transactionController.getVendorTransaction );
    app.post("/api/transaction/:cid", [authJwt.verifyToken],transactionController.createTransaction);
    app.post("/api/transaction/booking/:cid", [authJwt.verifyToken],transactionController.createTransactionBookingsThrough);
    app.post("/api/transaction/referral/:cid", [authJwt.verifyToken],transactionController.createTransactionReferralCodeThrough);

    // Categories Controller
    app.get("/api/service-city",cityController.getAllCity);
    app.get("/api/service-city/:id",cityController.getSingleCity);
    app.post("/api/service-city",[authJwt.verifyToken],cityController.createCity);
    app.put("/api/service-city/:id",[authJwt.verifyToken],cityController.updateCity);
    app.delete("/api/service-city/:id",[authJwt.verifyToken],cityController.deleteCity);
}; 

