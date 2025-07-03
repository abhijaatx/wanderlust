const mongoose = require('mongoose');
const { listingSchema } = require('../schema');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    default: [],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});
ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        let a = await Review.deleteMany({ _id: { $in: listing.reviews } });
        console.log(a);
    }
});



const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;