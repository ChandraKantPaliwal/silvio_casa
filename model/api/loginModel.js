var validator=require("validator");

exports.validate=function(req, res, next){
	if(typeof req.body.email=="undefined" || req.body.email=="" || !validator.isEmail(req.body.email)){
		if(typeof req.body.email=="undefined" || req.body.email==""){
			res.jsonp(422, {"success":"false", "message": "invalid email"});
		}
		res.jsonp(422, {"success":"false", "message": "invalid email"});
	}
	else if(typeof req.body.password=="undefined" || req.body.password==""){
		res.jsonp(404, {"success":"false", "message": "Password not found"});
	}
	else{
		next();
	}
};