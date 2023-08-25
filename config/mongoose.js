const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://kumarakashsahu98765:hJuBI3O9Vu9EWma7@cluster0.7jpcgdb.mongodb.net/ers-db");


const db= mongoose.connection;
db.on("error", console.error.bind(console,"Error in connection to Mongodb"));


db.once("open", function(){
    console.log("Successfully connected to Database :: MongoDB");

    
});

module.exports =db;

