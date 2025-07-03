const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6844732723c9ff35f35306bb",
    }));
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
};

initDB();