exports.search_item=function(req,res){
var query="SELECT * from `items` where `code` LIKE  '%"+req.params.item_code+"%' ";
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