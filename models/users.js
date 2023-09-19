const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        required : true,
    },
    to : [     
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User', // Reference to other User documents, indicating to whom this user sends reviews
        }
    ],
    from : [    
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review', // Reference to Review documents, indicating reviews received by this user
        }
    ]

},{
    timestamps : true, // Adds timestamps for when the user document was created and updated
});

// Create a model for the user schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
