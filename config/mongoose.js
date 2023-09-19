const mongoose = require("mongoose");

// Set mongoose option to allow undefined fields in queries
mongoose.set('strictQuery', false);

// Connect to MongoDB using the provided URL
mongoose.connect("mongodb+srv://kumarakashsahu98765:hJuBI3O9Vu9EWma7@cluster0.7jpcgdb.mongodb.net/ers-db");

// Get the database connection
const db = mongoose.connection;

// Event listener for connection error
db.on("error", console.error.bind(console, "Error in connection to MongoDB"));

// Event listener for successful connection
db.once("open", function(){
    console.log("Successfully connected to Database :: MongoDB");
});

// Export the database connection
module.exports = db;
