exports.index=function(req, res){
    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/report/',
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
            	for(i=0; i< data.reports.length; ++i){
					data.reports[i].created_at = moment(data.reports[i].created_at.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
                res.render('report', { title: 'Report', report:'active', priv:session.userPriv, username:session.userName , reports:data.reports});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};
exports.range=function(req, res){
	req.body.dateEnd=moment(req.body.dateEnd, "DD-MM-YYYY").format("YYYY-MM-DD");
	req.body.dateStart=moment(req.body.dateStart, "DD-MM-YYYY").format("YYYY-MM-DD");
    var options = {
        host : config.host,
        port : config.appPort,
        path : '/api/billDetails/'+req.body.dateStart+'/'+req.body.dateEnd,
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
            	for(i=0; i< data.reports.length; ++i){
					data.reports[i].created_at = moment(data.reports[i].created_at.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
                res.render('partialRangeReport', {reports:data.reports});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};