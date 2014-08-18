exports.index=function(req, res){
	var query="SELECT * FROM `silver_price`ORDER BY `created_at` DESC LIMIT 5";
	connection.query(query, function(err, prices){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			console.log(silver_price);
			res.jsonp(200,{"success":"true","message":"", "prices":prices});
		}
	});

};