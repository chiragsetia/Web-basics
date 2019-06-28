var	mongo 	=	require("mongoose")
	plm		=	require("passport-local-mongoose");
var us=new mongo.Schema({
	username:String,
	passport: String
});
us.plugin(plm);
module.exports=new mongo.model("User",us);