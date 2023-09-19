const User = require('../models/users');
const Review = require('../models/review');

// Function to create a review for a user
module.exports.createReview = async function(req, res){

    try{
        // Find the recipient user by their ID
        let recipient = await User.findById(req.params.id);

        if(!recipient){
            // If the recipient is not found, redirect to the homepage
            return res.redirect('/');
        }

        // Check if the current user (req.user) is authorized to create a review
        for(let i = 0; i < recipient.from.length; i++){
            if(req.user){
                if(recipient.from[i] == req.user.id){
                    // Create a new review in the database
                    const new_review = Review.create({
                        to : recipient.id,           // ID of the recipient
                        from : req.user.id,          // ID of the user creating the review
                        review : req.query.newReview, // The review content from the query parameters
                    });

                    if(!new_review){
                        // Handle the case where creating the review failed
                        // (You may want to add error handling logic here)
                    }
                    
                    // Redirect to the homepage after creating the review
                    return res.redirect('/');
                }
            }else{
                // If the user is not authenticated, redirect to the sign-in page
                return res.redirect("/user/sign-in");
            }
        }
        
        // Redirect to the homepage if the user is not authorized
        return res.redirect('/');
    }catch(err){
        console.log("Error", err);
        return;
    }
};
