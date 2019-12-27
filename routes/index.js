var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("landing", {currentUser:req.user});
});

//=============
//Auth routes
//=============
router.get("/register", function(req, res){
	res.render("register", {currentUser:req.user});
});

//handle signup logic
router.post("/register", function(req, res){
	var newUser = ({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("register", {"error": err.message});
		}
			passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp, " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login", {currentUser:req.user});
});

//handling login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
});
	
//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged out");
	res.redirect("/campgrounds");
});


module.exports = router;
