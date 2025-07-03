const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        }
    }).populate("owner");
    console.log(listing);
    if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    } else res.render("./listings/show.ejs", { listing });
}

module.exports.createLitsing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // const newListing=new Listing(req.body.listing);
    // const listing = req.body.listing;
    // listing.owner = req.user._id;
    // await new Listing(listing).save();
    req.flash("success", "new listing created");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    let orgURL = listing.image.url;
    orgURL = orgURL.replace("/upload", "/upload/h_300,w_250");
    res.render("./listings/edit.ejs", { listing, orgURL });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    // console.log(listing.description);
    console.log(id);
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }



    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " listing deleted");
    res.redirect("/listings");
}

