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
            console.log(data);
            if(response.statusCode == 200){
                var optionsInventory = {
                    host : config.host,
                    port : config.appPort,
                    path : '/api/inventory/',
                    method : 'GET',
                    headers: {
                    'Content-Type':'application/json',
                    'authentication_token': session.token
                    }
                };
                var reqGetInventory = http.request(optionsInventory, function(response) {
                    var data_final_inventory ="";
                    response.on('data', function(chunk) {
                        data_final_inventory = data_final_inventory+chunk;
                    });
                    response.on('end',function (){
                        var dataInventory = JSON.parse(data_final_inventory);
                        console.log(dataInventory);
                        if(response.statusCode == 200){
                            res.render('inventory', { title: 'Add Item', inventory:'active', priv:session.userPriv, username:session.userName, itemTypes:data.item_types , inventories:dataInventory.items});
                        } else {
                            res.send(dataInventory.success);
                        }
                    });
                });
                reqGetInventory.end();
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};