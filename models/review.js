const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    // listingId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Listing',
    //     required: true
    // },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    rating: {
        type: Number,
        //required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        // required: true,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Review", reviewSchema);