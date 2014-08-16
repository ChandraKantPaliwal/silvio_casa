exports.index=function(req, res){
	var itemTypes;
    var optionsGet = {
            host : config.host,
            port : config.appPort,
            path : '/api/itemTypes/'+session.userId,
            method : 'GET',
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    var reqGet = http.request(optionsGet, function(response) {
        var data_final = '';
        response.on('data', function(chunk) {
            data_final = data_final+chunk;
        });
        response.on('end',function (){
        	if(response.statusCode==200){
        		itemTypes=data_final.item_types;
        	}
        	else{
        		itemTypes=[];
        	}
        });

    });

    reqGet.write(dGet);
    reqGet.end(function(){
    	res.render('item', { title: 'Add Item', items:'active', priv:session.userPriv, username:session.userName , itemTypes:itemTypes});
    });
};