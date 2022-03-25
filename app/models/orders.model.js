const mongoose = require("mongoose");
const Orders = mongoose.model(
    "Orders",
    new mongoose.Schema({
        paymentStatus: { type: String },
        fulfillmentStatus: { type: String },
        couponCode: { type: String },
        discountAmount: { type: Number },
        discountPercentage: { type: Number },
        orderComments: { type: String },
        total: { type: Number },
        additionalInfo:
            {
                name: { type: String },
                street: { type: String },
                city: { type: String },
                countryCode: { type: String },
                postalCode: { type: String },
                phone: { type: String }
            },
        shippingPerson:
            {
                name: { type: String },
                street: { type: String },
                city: { type: String },
                countryCode: { type: String },
                postalCode: { type: String },
                phone: { type: String }
            },
        items: [
            {
                name: { type: String },
                productId: { type: String },
                price: { type: Number },
                quantity: { type: Number },
                discountAmount: { type: Number },
                discountPercentage: { type: Number },
                commissionAmount: { type: Number },
                commissionPercentage: { type: Number },
                priceCutWithCommision: { type: Number },
                vendorId: {type: String},
                taxes : [
                    {
                        data: {
                            name: {type: String},
                            percentage: {type: String},
                            _id: {type: String},
                        },
                        taxAmount: {type: Number}
                    }
                ]
            }
        ],
        createdAt: { type: String },
        orderId: { type: String },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);
module.exports = Orders;