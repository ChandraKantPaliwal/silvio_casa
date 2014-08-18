exports.index=function(req, res,next){
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else
	{
		connection.query("SELECT * from `users` where `authentication_token`='"+req.header("authentication_token")+"' LIMIT 1", function(err, user){
			if(err)
			{
				res.jsonp(500,{"success":"false","message":"internal error"});
			}
			else if(user.length>0)
			{
				next();
			}
			else
			{
				res.jsonp(404,{"success":"false","message":"User not found"});
			}
		});
	}
};

//validate for save
exports.save=function(req, res,next){

	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else if(typeof req.body.user_id=="undefined"||req.body.user_id=='')
	{
		res.jsonp(404,{"success":"false","message":"user_id not found"});
	}
	else if(typeof req.body.price=="undefined"||req.body.price=="")
	{
		res.jsonp(404,{"success":"false","message":"price not found"});
	}
	else
	{
		connection.query("SELECT * from `users` where `id`='"+req.body.user_id+"' AND `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
			if(err)
			{
				res.jsonp(500,{"success":"false","message":"internal error"});
			}
			else if(user.length>0)
			{
				next();
			}
			else
			{
				res.jsonp(404,{"success":"false","message":"User not found"});
			}
		});
	}
};