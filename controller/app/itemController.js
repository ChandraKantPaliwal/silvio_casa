exports.index=function(req, res){
    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/itemTypes/'+session.userId,
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
            var data = JSON.parse(data_final);
            if(response.statusCode == 200){
                res.render('item', { title: 'Add Item', items:'active', priv:session.userPriv, username:session.userName , itemTypes:data.item_types});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};

exports.save = function(req, res){
	console.log("oskoskosk");
	var dataGet = {
        "user_id":session.userId,
        "name":req.body.name,
        "code":req.body.code,
        "item_types_id":req.body.item_type,
        "weight":req.body.weight,
        "quantity":req.body.quantity,
        "price_type":req.body.price_type,
        "price_value":req.body.price_value,
    };
    var dGet = querystring.stringify(dataGet);
    var optionsPost = {
            host : config.host,
            port : config.appPort,
            path : '/api/item',
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
				'authentication_token': session.token
            }
        };
    var reqPost = http.request(optionsPost, function(response) {
        var data_final = '';
        response.on('data', function(chunk) {
            data_final = data_final+chunk;
        });
        response.on('end',function (){
        	console.log(response.statusCode);
        	if(response.statusCode==200){
        		res.redirect('/');
        	}
        	else{
                console.log(data_final);
        		res.redirect('/item');
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
        path : '/api/item/',
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
                res.render('item-show', { title: 'Show Item', items:'active', priv:session.userPriv, username:session.userName , items:data.items});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};

exports.filter=function(req, res){
    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/item/'+req.params.q,
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
                res.jsonp(200, {"items":items:data.items});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};