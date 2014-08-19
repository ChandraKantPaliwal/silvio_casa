exports.search_item=function(req,res,next){
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else if(typeof req.params.item_code=="undefined"||req.params.item_code=="" )
	{
		res.jsonp(404,{"success":"false","message":"item_code not found"});	
	}
	else
	{
		 // `id`='"+req.params.user_id+"' AND
		connection.query("SELECT * from `users` where `authentication_token`='"+req.header("authentication_token")+"' LIMIT 1", function(err, user){
			if(err)
			{
				console.log(err);
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