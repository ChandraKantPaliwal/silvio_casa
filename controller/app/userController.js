exports.index=function(req, res){
        var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/dashboard',
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
            if(response.statusCode == 200){
                console.log("yoyoyoy");
                res.render('index', { title: 'Welcome to Silvio Casa', dashboard:'active', priv:session.userPriv, username:session.userName, items:data.items});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};
exports.disableNotification=function(req, res){
    req.body.id=req.params.id;
    req.body.user_id=session.userId;
    var dGet = querystring.stringify(req.body);
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.appPort,
            path : '/api/disableNotification',
            method : 'PUT',
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'authentication_token': session.token
            }
        };
        console.log("SOKOSKSOOKSOKSOKOSKSKSOKSOKSOKSKS");
    var reqPost = http.request(options, function(response) {
        response.on('data', function(data) {
            console.log("yooyoyoyoyoyoyyoyooyooyo");
            var data=JSON.parse(data);
            console.log(data);
            if(data.statusCode == 200){
                res.json(data);
            } else {
                res.json(data);
            }
        });

    });
    reqPost.write(dGet);
    reqPost.end();
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
	            session.userName=data.user[0].name;
	            session.userPriv=data.user[0].priv;
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
    console.log("yoyoyoy");
    console.log(session);
    console.log(session.Session);
   session.Session.flush();
    console.log(session);
   res.redirect('/');
   // res.render('/login', { title: 'SILVIO CASA'});
};