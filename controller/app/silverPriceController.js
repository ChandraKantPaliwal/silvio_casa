exports.index=function(req, res){
    console.log("silver price controller called");
    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/silverPrice',
        method : 'GET',
        headers: {
        'Content-Type':'application/json',
        'authentication_token': session.token
        }
    };
    console.log("silver price controller called");
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
                for(i=0; i< data.prices.length; ++i){
                    data.prices[i].created_at = moment(data.prices[i].created_at.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                }
                res.render('silverprice', { title: 'Silver Price', silverprice:'active', priv:session.userPriv, username:session.userName , silverPrices:data.prices});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};

exports.save = function(req, res){
	var dataGet = {
        "user_id":session.userId,
        "price":req.body.price
    };
    var dGet = querystring.stringify(dataGet);
    var optionsPost = {
            host : config.host,
            port : config.appPort,
            path : '/api/silverPrice',
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
        		res.redirect('/silverPrice');
        	}
        	else{
                res.redirect('/');
        	}
        });

    });

    reqPost.write(dGet);
    reqPost.end();
};