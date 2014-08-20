exports.save=function(req,res){
	console.log(req.body);
	var query="Insert into `orders`(`customer_name`,`address`, `tin_no`, `payment_mode`, `discount_percent`, `vat_percent`,`advance`) values ('"+req.body.customer_name+"','"+req.body.address+"','"+req.body.tin_no+"','"+req.body.payment_mode+"','"+req.body.discount_percent+"','"+req.body.vat_percent+"','"+req.body.advance+"')";	
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			console.log(info.insertId);
			query="";
			console.log(req.body.items.length);
			for(var i=0;i<req.body.items.length;i++)
			{
				query="Insert into `order_items`(`item_id`,`quantity`,`rate`,`orders_id`) values ('"+req.body.items[i].item_id+"','"+req.body.items[i].quantity+"','"+req.body.items[i].rate+"','"+info.insertId+"')";
				connection.query(query, function(err, info){
					if(err){
						console.log(err);
						res.jsonp(500,{"success":"false","message":"internal error"});
					}
					else{
						res.jsonp(200,{"success":"true","message":"Data Inserted Successfully"});
					}
				});
			}	
		}
	});
};