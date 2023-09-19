const mongoose = require('mongoose');

// Define the schema for a review
const reviewSchema = new mongoose.Schema({

    review : {
        type : String,
        required : true,
    },
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', // Reference to the User model for the sender of the review
    },
    to : {  
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', // Reference to the User model for the recipient of the review
    }

},{
    timestamps : true, // Adds timestamps for when the review was created and updated
});

// Create a model for the review schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; // Export the Review model
