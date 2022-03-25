const mongoose = require("mongoose");
const Bookings = mongoose.model(
    "Bookings",
    new mongoose.Schema({
        paymentStatus: { type: String },
        couponCode: { type: String },
        discountAmount: { type: Number },
        bookingTotal: { type: Number },
        subTotal: { type: Number },
        bookingsComments: { type: String },
        services: [
            {
                name: {type: String},
                price: {type: Number},
                desc: {type: String},
                time: {type: Number},
                _id: {type: String},
                _shopUser: {type: String},
                discountAmount: { type: Number },
                discountPercentage: { type: Number },
                commissionAmount: { type: Number },
                commissionPercentage: { type: Number },
                priceCutWithCommision: { type: Number },
                media: [
                    {
                      url:{type:String},
                      type: {type:String},
                      _id: {type:String}
                    }
                ],
            }
        ],
        slot: {
            start:{type:String},
            end: {type:String},
            id: {type:String},
            day: {type:String},
          },
        bookingDate: {type: Date},
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, { timestamps: true })
);
module.exports = Bookings;