//fetch_items
exports.fetch_item_types=function(req, res){
	console.log("Hello...123");
	connection.query("SELECT `id`,`name` from `item_types`", function(err, item_types){
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

// get item detail

exports.index=function(req, res){
	var query="SELECT `items`.`id`, `items`.`name`, `items`.`code`, `item_types`.`name` as `item_type_name`, `items`.`weight`, `items`.`quantity`, `items`.`making_charges`, `items`.`fixed_price` FROM `items` LEFT JOIN `item_types` ON `items`.`item_types_id`=`item_types`.`id`";
	connection.query(query, function(err, items){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			res.jsonp(200,{"success":"true","message":"", "items":items});
		}
	});

};

//add_item
exports.save=function(req, res){
	var query="";
	if(req.body.price_type=='no'){
		query="Insert into `items`(`name`,`code`, `item_types_id`, `weight`, `quantity`, `making_charges`) values ('"+req.body.name+"','"+req.body.code+"','"+req.body.item_types_id+"','"+req.body.weight+"','"+req.body.quantity+"','"+req.body.price_value+"')";
	}
	else{
		query="Insert into `items`(`name`,`code`, `item_types_id`, `weight`, `quantity`, `fixed_price`) values ('"+req.body.name+"','"+req.body.code+"','"+req.body.item_types_id+"','"+req.body.weight+"','"+req.body.quantity+"','"+req.body.price_value+"')";	
	}
	connection.query(query, function(err, item){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			res.jsonp(200,{"success":"true","message":"Data Inserted Successfully"});
		}
	});

};