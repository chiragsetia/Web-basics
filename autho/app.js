var express		=require("express"),
	mongo  		=require("mongoose"),
	bodyParser	=require("body-parser"),
	passport 	=require("passport");
	pl 			=require("passport-local"),
	plm			=require("passport-local-mongoose")
	User 		=require("./models/user.js");

mongo.connect("mongodb://localhost:27017/autho",{useNewUrlParser: true});
var app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//for authenication
app.use(require("express-session")({
	secret: "This is John Cena",// it is used to encode and decode data
	resave: false,
	saveUninitialized: false //if we dont it will ask for it
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());// for encrypting the session
passport.deserializeUser(User.deserializeUser());// for decrypting the session
passport.use(new pl(User.authenticate()));
// till now authenication
//=================================

app.get("/", function (req, res) {
	res.render("home");// body...
});

app.get("/secret",isLoggedIn , function(req,res){
	res.render("secret");//middleware: is loggedIn is going to check for log in or not
});




//login
app.get("/login",function(req,res){
	res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local",{
	successRedirect: "/secret",/*this is called middleware and it is the code that runs before callbach*/
	failureRedirect: "/login" /*this is used to authenticate*/
}) ,function(req,res){
 
})

//register page
app.get("/register",function(req,res){
	res.render("register");
});

//user signup
app.post("/register", function(req, res){
	console.log(req.body.username);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    });
});

//logout
app.get("/logout",function(req,res){
	req.logout();//for login out.
	res.redirect("/")
});

function isLoggedIn(req,res,next) {
	//next is the next thing nedded to call if failed or done
	if(req.isAuthenticated())//checking is logged in
		next();
	else
	{
		res.redirect("/login")
	}

}


app.listen(3000,function(){
	console.log("Started");
});