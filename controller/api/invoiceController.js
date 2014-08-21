exports.index=function(req,res){
	var query="select * from `orders`";
	connection.query(query, function(err, invoices){
		if(err){
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			res.jsonp(200,{"success":"true","message":"","invoices":invoices});
		}
	});
};