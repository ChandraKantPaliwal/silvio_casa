exports.save=function(req,res){
	var query="Insert into `orders`(`customer_name`,`address`, `tin_no`, `payment_mode`, `discount_percent`, `vat_percent`,`advance`) values ('"+req.body.customer_name+"','"+req.body.address+"','"+req.body.tin_no+"','"+req.body.payment_mode+"','"+req.body.discount_percent+"','"+req.body.vat_percent+"','"+req.body.advance+"')";	
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			query="";
			for(var i=0;i<req.body.items.length;i++)
			{
				query="Insert into `order_items`(`items_id`,`quantity`,`price`,`orders_id`,`weight`) values ('"+req.body.items[i].id+"','"+req.body.items[i].quantity+"','"+req.body.items[i].price+"','"+info.insertId+"','"+req.body.items[i].weight+"')";
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