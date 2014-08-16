//Validate for updatepwd
exports.update_password = function(req, res, next){

	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else
	{
		if(typeof req.body.id=='undefined'||req.body.id=='')
		{
			res.jsonp(404,{"success":"false","message":"user_id not found"});
		}
		else if(typeof req.body.password=='undefined'||req.body.password=='')
		{
			res.jsonp(404,{"success":"false","message":"password not found"});
		}
		//check if user is valid..
		else
		{
		connection.query("SELECT * from `users` where `id`='"+req.body.id+"' AND `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
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
}

};
//Validate for addUser
exports.addUser=function(req,res,next){
	//console.log("At add user :"+req.body.id);
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else if(typeof req.body.id=='undefined'||req.body.id=='')
	{
		res.jsonp(404,{"success":"false","message":"user_id not found"});
	}
	else if(typeof req.body.email=='undefined'||req.body.email=='')
	{
		res.jsonp(404,{"success":"false","message":"email not found"});
	}
	else if(typeof req.body.password=='undefined'||req.body.password=='')
	{
		res.jsonp(404,{"success":"false","message":"password not found"});
	}
	else if(typeof req.body.name=='undefined'||req.body.name=='')
	{
		res.jsonp(404,{"success":"false","message":"name not found"});
	}
	else
	{
	//	console.log("AT"+req.header("authentication_token"));
	//	console.log(req.body.id);
		connection.query("SELECT * from `users` where `id`='"+req.body.id+"' AND `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
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

//Validate for fetch_user
exports.fetchUser=function(req,res,next){
	//console.log(req.params.id);
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else
	{
		connection.query("SELECT * from `users` where `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
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
//Validate for delete_user
exports.deleteUser=function(req,res,next){
	//console.log('hello');	
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
		console.log(req.params.user_id);
		connection.query("SELECT * from `items_type` where `id`='"+req.params.user_id+"' AND `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
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