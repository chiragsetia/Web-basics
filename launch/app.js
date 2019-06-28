var express= require("express"),
	app	=	express(),
	port= process.env.PORT || 5000;

app.set("view engine","ejs");

//app.set('views', path.join(__dirname, 'views'));

app.get("/",function(req,res) {
	res.render("home");
})
app.get("/other",function(req,res) {
	res.render("Second");
})


app.listen(port,function() {
	console.log("Welcome");
})