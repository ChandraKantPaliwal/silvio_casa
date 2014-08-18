// get item detail

exports.index=function(req, res){
	var query="SELECT `items`.`id`,`items`.`name`,`items`.`code`,`items`.`weight`,`items`.`quantity`,`items`.`making_charges`,`items`.`fixed_price`,`item_types`.`name` as `item_type_name`,`item_types`.`id` as `item_type_id` FROM `items` LEFT JOIN `item_types` ON `items`.`item_types_id`=`item_types`.`id`";
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
