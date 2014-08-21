exports.new=function(req, res){
	res.render('bill', { title: 'Generate New Bill', bill:'active', priv:session.userPriv, username:session.userName});
}

exports.save = function(req, res){
	var ids = req.body.ids;
	var weight = req.body.item_weight;
	var quantity = req.body.item_quantity;
	var price = req.body.item_price;

	var i;
	req.body.items = [];

	if(typeof ids !== 'undefined'){
		for (i = 0; i < ids.length; ++i) {
			if(ids[i] == ' ') ids[i] = '';
	 		var obj = { 'id':ids[i], 'weight':weight[i], 'quantity':quantity[i], "price":price[i]};
	        if(ids[i] != 0){
	        	req.body.items[i] = obj;
	        }
	    }
	}

	req.body.user_id = session.userId;

	delete req.body.quantity;
	delete req.body.item_code;
	delete req.body.item_name;
	delete req.body.ids;
	delete req.body.item_weight;
	delete req.body.item_quantity;
	delete req.body.item_price;

	var dGet = JSON.stringify(req.body);

	console.log(req.body);
	var options = {
			host : config.host,
			port : config.appPort,
			path : '/api/bill',
			method : 'POST',
			headers: {
		          'Content-Type': 'application/json',
		          'authentication_token': session.token
		    }
		};
	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(response.statusCode);
			console.log(data);
			if(response.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});
	});
	reqPost.write(dGet);
	reqPost.end();
};


exports.remove=function(req, res){
	var dGet = querystring.stringify(req.params);
	var options = {
			host : config.host,
			port : config.appPort,
			path : '/api/bill/'+req.params.id,
			method : 'DELETE',
			headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'authentication_token': session.token
		    }
		};
	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(response.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});
	reqPost.write(dGet);
	reqPost.end();
};

exports.show=function(req, res){
    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/bill/'+req.params.id,
        method : 'GET',
        headers: {
        'Content-Type':'application/json',
        'authentication_token': session.token
        }
    };
    var reqGet = http.request(options, function(response) {
        var data_final ="";
        response.on('data', function(chunk) {
            data_final = data_final+chunk;
        });
        response.on('end',function (){
            console.log(response.statusCode);
            var data = JSON.parse(data_final);
            console.log(data);
            if(response.statusCode == 200){
                res.jsonp(200, {"success":true, "items":data.item});
            } else {
                res.jsonp(200, {"success":false, "message":data.message});
            }
        });
    });
    reqGet.end();
};