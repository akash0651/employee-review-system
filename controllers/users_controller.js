const User = require('../models/users');
const Review = require('../models/review');

// Function to create a new user
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Incorrect Password');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding user in signing up");
            return;
        }

        if (!user) {
            // Create a new user if they do not exist
            User.create({
                name: req.body.name,
                email: req.body.email,
                isAdmin: false,
                password: req.body.password
            }, function (err, user) {
                if (err) {
                    console.log("error in creating user while signing up");
                    return;
                }
                req.flash('success', 'Sign Up Successful');
                return res.redirect('/');
            });
        } else {
            // Redirect back to the signup page if the user already exists
            return res.redirect('back');
        }
    });
}

// Function to create a user session (login)
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

// Function to destroy a user session (logout)
module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out Successfully');
        return res.redirect('/users/sign-in');
    });
}

// Function to render the sign-in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('home', {
            title: "Home"
        });
    }
    return res.render('user_sign_in', {
        title: "Login"
    });
}

// Function to render the sign-up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return res.render('user_sign_up', {
            title: "Sign Up"
        });
    }

    if (req.isAuthenticated()) {
        return res.render('home', {
            title: "Home"
        });
    }

    return res.render('user_sign_up', {
        title: "Sign Up"
    });
}

// Function to render the home page
module.exports.home = async function (req, res) {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/sign-in');
        }

        let user = await User.findById(req.user.id);
        let review = await Review.find({ to: req.user.id });
        let recipients = [];

        for (let i = 0; i < user.to.length; i++) {
            let x = await User.findById(user.to[i]);
            if (x) {
                recipients.push({
                    id: x._id,
                    name: x.name
                });
            }
        }

        let reviews = [];

        for (let i = 0; i < review.length; i++) {
            let x = await User.findById(review[i].from);
            let curr_review = {
                name: x.name,
                review: review[i].review,
                updated: review[i].updatedAt,
            };
            reviews.push(curr_review);
        }

        return res.render('home', {
            title: "Home",
            recipients: recipients,
            reviews: reviews,
            user: user,
        });

    } catch (error) {
        console.log(error);
        return;
    }
}
