const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const dbUrl = process.env.ATLAS_DB_URL;


if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}


console.log(dbUrl);
main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6866dbc840c27dcd465f5593",
    }));
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
};

initDB();