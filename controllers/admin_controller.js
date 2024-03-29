const User = require("../models/users");
const Review = require("../models/review");

// Function to render the admin page
module.exports.adminPage = async function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }else{
        if(req.user.isAdmin == false){
            req.flash('error','You are not an admin');
            return res.redirect('/');
        }else{
            try{
                let user = await User.find({});
                var employeeList = [];
                for(let i = 0; i < user.length; i++){
                    var temp = {
                        name : user[i].name,
                        id : user[i].id,
                    };
                    employeeList.push(temp);
                }
                
                return res.render('admin', {
                    title : "Assign Work",
                    employeeList : employeeList,
                });
            }catch(err){
                console.log('Error while admin', err);
                return;
            }
        }
    }
};

// Function to set reviewers for employees
module.exports.setReviewrs = async function(req, res){
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign-in');
        }else{
            let employee = await User.findById(req.user.id);

            if(employee.isAdmin == false){
                req.flash('error','You are not an admin');
                return res.redirect('/');
            }else if(req.body.Reviewer == req.body.Recipient){
                return res.redirect('back');
            }else{
                let reviewer = await User.findById(req.body.Reviewer);
                
                if(!reviewer){
                    return res.redirect('back');
                }

                let recipient = await User.findById(req.body.Recipient);

                if(!recipient){
                    return res.redirect('back');
                }

                reviewer.to.push(recipient);
                reviewer.save();

                recipient.from.push(reviewer);
                recipient.save();

                return res.redirect('back');
            }
        }
    }catch(err){
        console.log("Error", err);
        return;
    }
};

// Function to assign an employee as an admin
module.exports.newAdmin = async function(req, res){
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign-in');
        }
        if(req.user.isAdmin == true){
            let employee = await User.findById(req.body.newAdmin);
    
            if(!employee){
                return res.redirect('back');
            }
    
            if(employee.isAdmin == true){
                return res.redirect('back');
            }
    
            if(employee.isAdmin == false){
                employee.isAdmin = true,
                employee.save();
    
                return res.redirect('/admin/');
            }
        }
    }catch(err){
        console.log("Error", err);
        return;
    };
};

// Function to view a list of employees
module.exports.viewEmployees = async function(req, res){
    try{
        if(req.isAuthenticated()){
            if(req.user.isAdmin){
                let employees = await User.find({});
                
                if(employees){
                    return res.render('employee', {
                        title : "Employee",
                        employees : employees,
                    });
                }
            }else{
                return res.redirect('/');
            }
        }else{
            return res.redirect("/users/sign-in");
        }
    }catch(err){
        console.log("Error", err);
        return;
    }
};

// Function to delete an employee
module.exports.deleteEmployee = async function(req, res){
    try{
        
        if(req.isAuthenticated()){
            if(req.user.isAdmin){
                await User.deleteOne({_id : req.params.id});
                return res.redirect('/admin/employees');
            }
        }
    }catch(err){
        console.log("Error", err);
        return;
    }
};
