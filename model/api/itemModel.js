//validate for fetch_item_types
exports.fetch_item_types=function(req, res,next){
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined"||req.params.user_id=='')
	{
		res.jsonp(404,{"success":"false","message":"user_id not found"});
	}
	else
	{
		connection.query("SELECT * from `users` where `id`='"+req.params.user_id+"' AND `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
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

exports.index=function(req, res,next){
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	// else if(typeof req.params.user_id=="undefined"||req.params.user_id=='')
	// {
	// 	res.jsonp(404,{"success":"false","message":"user_id not found"});
	// }
	else
	{
		 // `id`='"+req.params.user_id+"' AND
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
//validate for add item
//validate 
exports.save=function(req, res,next){

if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else if(typeof req.body.user_id=="undefined"||req.body.user_id=='')
	{
		res.jsonp(404,{"success":"false","message":"user_id not found"});
	}
	else if(typeof req.body.name=="undefined"||req.body.name=="")
	{
		res.jsonp(404,{"success":"false","message":"name not found"});
	}
	else if(typeof req.body.code=="undefined"||req.body.code=="")
	{
		res.jsonp(404,{"success":"false","message":"code not found"});
	}
	else if(typeof req.body.item_types_id=="undefined"||req.body.item_types_id=="")
	{
		res.jsonp(404,{"success":"false","message":"items_type_id not found"});
	}
	else if(typeof req.body.weight=="undefined"||req.body.weight=="")
	{
		res.jsonp(404,{"success":"false","message":"weight not found"});
	}
	else if(typeof req.body.quantity=="undefined"||req.body.quantity=="")
	{
		res.jsonp(404,{"success":"false","message":"quantity not found"});
	}
	else if(typeof req.body.price_value=="undefined"||req.body.price_value=="")
	{
		res.jsonp(404,{"success":"false","message":"Making charges not found"});
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
