exports.index=function(req, res){
	    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/invoice',
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
            	for(i=0; i< data.invoices.length; ++i){
					data.invoices[i].created_at = moment(data.invoices[i].created_at.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
                res.render('invoice', { title: 'Invoice', invoice:'active', priv:session.userPriv, username:session.userName , invoices:data.invoices});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
// res.render('invoice', { title: 'Invoice', priv:session.userPriv, username:session.userName});
};