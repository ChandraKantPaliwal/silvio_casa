exports.index=function(req, res){
	// api made here
	if(session.userId!="undefined"){
		res.render('index', { title: 'Express' });
	}
	else{
		res.redirect('/login');
	}
};

exports.login = function(req, res){
	var name = req.body.name;
    var password = req.body.password;
    var password_enc = crypto.createHash('md5').update(password).digest('hex');
    var dataGet = {
        "email":name,
        "password":password_enc
    };
    var dGet = querystring.stringify(dataGet);
    var optionsPost = {
            host : config.host,
            port : config.appPort,
            path : '/api/login',
            method : 'POST',
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
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
        		console.log(data_final);
	            var data=JSON.parse(data_final);
	            session.userId=data.user[0].id;
	            session.userPrev=data.user[0].priv;
	            session.token = data.authentication_token;
	            res.send("valid");
        	}
        	else{
        		res.send("invalid");
        	}
        });

    });

    reqPost.write(dGet);
    reqPost.end();
};

exports.logout = function(req, res){
   session.destroy();
   res.redirect('/');
   //console.log(moment("04/13/2014", "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss'));
};