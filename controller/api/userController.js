//update password
exports.update_password=function(req, res){
	
	connection.query("SELECT * from `users` where `id`='"+req.body.id+"'", function(err, user){
		if(err)
		{
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(user.length>0)
		{
	
			connection.query(" UPDATE `users` set `password`='"+req.body.password+"' where `id`='"+req.body.id+"'", function(err, user){
				if(err)
				{
					res.jsonp(500,{"success":"false","message":"internal error"});
				}
				else if(user.affectedRows>0){
					res.jsonp(200,{"success":"true","message":"Updated Successfully"});
				}
				else
				{
					//console.log(user);
					res.jsonp(404, {"success":"false", "message": "Update Unsuccessful"});
				}
			});
		}
		else
		{
			res.jsonp(404, {"success":"false", "message": "User not dfdfdffound"});
		}
	});
};
//user detail
exports.fetch_user_details=function(req, res){
	connection.query("SELECT * from `users` where `id`='"+req.params.id+"'", function(err, user){
		if(err)
		{
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(user.length>0)
		{
			res.jsonp(200,{"success":"true","message":"Fetched Successfully","user_details":user});
		}
		else
		{
			res.jsonp(404,{"success":"false","message":"User not found"});
		}
	});
};
//add user
exports.add_new_user=function(req, res){
	connection.query("INSERT into `users`(name,email,password) values('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')", function(err, user){
		if(err)
		{
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else
		{
			res.jsonp(200,{"success":"true","message":"Added Successfully"});
		}
	});
};
//delete user
exports.delete_user=function(req, res){
	connection.query("SELECT * from `users` where `id`='"+req.params.id+"'", function(err, user){
		if(err)
		{
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(user.length>0)
		{
			connection.query("DELETE from users where `id`='"+req.params.id+"'",function(err,info){
				if(err)
				{
					//console.log(err);
					res.jsonp(500,{"success":"false","message":"internal error"});
				}
				else
				{
					res.jsonp(200,{"success":"true","message":"Delete Successful"});
				}
			});	
		}
		else
		{
			res.jsonp(404,{"success":"false","message":"User not found"});	
		}
	});
};	