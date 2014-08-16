//fetch_items
exports.fetch_item_types=function(req, res){
	console.log("Hello...123");
	connection.query("SELECT `id`,`name` from `items_type`", function(err, item_types){
		if(err)
		{
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(item_types.length>0)
		{
			res.jsonp(200,{"success":"true","message":"Fetched Successfully","item_types":item_types});
		}
		else
		{
			res.jsonp(404,{"success":"false","message":"Item types not found"});
		}
	});

};
//add_item
exports.add_item=function(req, res){
	console.log("Hello...123");
	connection.query("Insert into `items_type`(`name`,`code`,`items_type_id`,`weight`,`quantity`,`making_charges`,`fixed_price`) values ('"+req.body.name+"','"+req.body.code+"','"+req.body.items_type_id+"','"+req.body.weight+"','"+req.body.quantity+"','"+req.body.making_charges+"','"+req.body.fixed_price+"')", function(err, item_types){
		if(err)
		{
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(item_types.length>0)
		{
			res.jsonp(200,{"success":"true","message":"Fetched Successfully","item_types":item_types});
		}
		else
		{
			res.jsonp(404,{"success":"false","message":"Item types not found"});
		}
	});

};