exports.index=function(req, res){
	var query="SELECT * FROM `silver_price` ORDER BY `created_at` DESC LIMIT 5";
	connection.query(query, function(err, prices){
		if(err){
			console.log('error:'+err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			console.log(prices);
			res.jsonp(200,{"success":"true","message":"", "prices":prices});
		}
	});

};
exports.save=function(req,res){
	var query="";
	query="Insert into `silver_price`(`price`) values ('"+req.body.price+"')";
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

