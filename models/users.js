const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    to: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        }
    ],
    from: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review', // Reference to the Review model
        }
    ]
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
