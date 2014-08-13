exports.validate=function(req, res){
	connection.query("select * from `users` where `email`='"+req.body.email+"' AND `password`='"+req.body.password+"'", function(err, user){
		if(err){
			res.jsonp(500, {"success": "false", "message":"internal error"});
		}
		else{
			if(user.length>0){
				var time = new Date().getTime();
				var auth_token=req.body.email+time;
				auth_token=crypto.createHash('md5').update(auth_token).digest('hex');
				connection.query("UPDATE `users` SET `authentication_token`='"+auth_token+"' WHERE `id`='"+user[0].id+"'", function(err, data){
					if(err){
						res.jsonp(500, {"success": "false", "message":"internal error"});
					}
					else{
						res.jsonp(200, {"success":"true", "user":user, "authentication_token":auth_token});
					}
				});
			}
			else{
				res.jsonp(404, {"success":"false", "message": "user not found"});
			}
		}
	});
};