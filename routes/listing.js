const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage });


const listingController = require("../controllers/listings.js");

router.route("/")
    .get(

        wrapAsync(listingController.index)
    )
    .post(
        isLoggedIn,

        // validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingController.createLitsing)
    );

router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);

router.route("/:id")
    .get(

        wrapAsync(listingController.showListing)
    )
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;