const mongoose = require("mongoose");

// connect to mongodb
const connection = mongoose.createConnection(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
connection.once("open", () =>
    console.log("MongoDB database connection established")
);

module.exports = connection;
