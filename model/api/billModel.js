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
		res.jsonp(404,{"success":"false","message":"vat_percent not found"});
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
		var flag=1;
		var count=0;
		connection.query("SELECT * from `users` where `id`='"+req.body.user_id+"' AND `authentication_token`='"+req.header("authentication_token")+"'", function(err, user){
			if(err)
			{
				res.jsonp(500,{"success":"false","message":"internal error"});
			}
			else if(user.length>0)
			{
				
				for(var i=0;i<req.body.items.length;i++)
				{
					count=i+1;
					if(typeof req.body.items[i].id=="undefined"||req.body.items[i].id=="")
					{
						flag=0;
						res.jsonp(404,{"success":"false","message":"item id not found for Item '"+count+"'"});
					}
					else if(typeof req.body.items[i].quantity=="undefined"||req.body.items[i].quantity=="")
					{
						flag=0;
						res.jsonp(404,{"success":"false","message":"quantity not found for Item '"+count+"'"});
					}
					else if(typeof req.body.items[i].price=="undefined"||req.body.items[i].price=="")
					{
						flag=0;
						res.jsonp(404,{"success":"false","message":"price not found for Item '"+count+"'"});
					}
					else if(typeof req.body.items[i].weight=="undefined"||req.body.items[i].weight=="")
					{
						flag=0;
						res.jsonp(404,{"success":"false","message":"weight not found for Item '"+count+"'"});
					}
				}
				if(flag)
				{
					next();
				}
			}
			
			else
			{
				res.jsonp(404,{"success":"false","message":"User not found"});
			}
		});
	}
};
exports.billDetails=function(req,res,next){
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
}