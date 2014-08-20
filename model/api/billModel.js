exports.save=function(req,res,next){
	if(typeof(req.header("authentication_token"))=='undefined'||req.header("authentication_token")=='')
	{
		res.jsonp(404,{"success":"false","message":"authentication_token not found"});
	}
	else if(typeof req.body.user_id=="undefined"||req.body.user_id=='')
	{
		res.jsonp(404,{"success":"false","message":"user_id not found"});
	}
	else if(typeof req.body.customer_name=="undefined")
	{
		res.jsonp(404,{"success":"false","message":"Customer name undefined"});
	}
	else if(typeof req.body.address=="undefined")
	{
		res.jsonp(404,{"success":"false","message":"Address undefined"});
	}
	else if(typeof req.body.tin_no=="undefined")
	{
		res.jsonp(404,{"success":"false","message":"tin_no undefined"});
	}
	else if(typeof req.body.payment_mode=="undefined"||req.body.payment_mode=="")
	{
		res.jsonp(404,{"success":"false","message":"payment_mode not found"});
	}
	else if(typeof req.body.discount_percent=="undefined"||req.body.discount_percent=="")
	{
		res.jsonp(404,{"success":"false","message":"discount_percent not found"});
	}
	else if(typeof req.body.vat_percent=="undefined"||req.body.vat_percent=="")
	{
		res.jsonp(404,{"success":"false","message":"discount_percent not found"});
	}
	else if(typeof req.body.advance=="undefined")
	{
		res.jsonp(404,{"success":"false","message":"advance undefined"});
	}
	else if(typeof req.body.items=="undefined"||req.body.items.length=="0")
	{
		res.jsonp(404,{"success":"false","message":"No items found"});
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