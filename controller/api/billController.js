exports.save=function(req,res){
 var flag=0;
 var query="Insert into `orders`(`customer_name`,`address`, `tin_no`, `payment_mode`, `discount_percent`, `vat_percent`,`advance`, `total_payable_amount`) values ('"+req.body.customer_name+"','"+req.body.address+"','"+req.body.tin_no+"','"+req.body.payment_mode+"','"+req.body.discount_percent+"','"+req.body.vat_percent+"','"+req.body.advance+"', '"+req.body.total_payable_amount+"')"; 
 connection.query(query, function(err, info){
  if(err){
   console.log(err);
   res.jsonp(500,{"success":"false","message":"internal error"});
  }
  else{
   console.log(info.insertId);
   var order_id=info.insertId;
   query="Insert into `order_items`(`orders_id`, `items_id`, `quantity`, `price`, `weight`) values";
   for(var i=0;i<req.body.items.length;i++){
    query+=" ('"+info.insertId+"', '"+req.body.items[i].id+"', '"+req.body.items[i].quantity+"', '"+req.body.items[i].price+"', '"+req.body.items[i].weight+"'),";
   }
   query=query.slice(0, -1);
   connection.query(query, function(err, info){
    if(err){
     console.log(err);
     res.jsonp(500,{"success":"false","message":"internal error"});
    }
    else{
     
     for(var i=0;i<req.body.items.length;i++){
      reduceQty(req.body.items[i].quantity,req.body.items[i].id,i, req, res, order_id)
     }
     
    }
    });
   
  }
 });
};

function reduceQty(quantity,id, i, req, res, order_id){

  connection.query("SELECT `quantity` from `items` where `id`='"+id+"'",function(err,qty){
   if(err)
   {
   console.log(err);
   res.jsonp(500,{"success":"false","message":"internal error"});
   }
   else if(qty.length>0)
   {
        var remaining=qty[0].quantity-quantity;
     connection.query("UPDATE `items` set `quantity`='"+remaining+"' where `id`='"+id+"'",function(err,qty){
     if(err)
     {
     console.log(err);
        res.jsonp(500,{"success":"false","message":"internal error"});
     }
     else 
     {
      if(i==req.body.items.length-1){
        res.jsonp(200,{"success":"true","message":"Order Generated Successfully", "order_id":order_id});
      }
      }
    });
  } 
 });         
}

exports.remove=function(req, res){
	var query="delete from `orders` where id='"+req.params.id+"'";
	var query_1="delete from `order_items` where orders_id='"+req.params.id+"'";
	connection.query(query, function(err, info){
		if(err){
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			connection.query(query_1, function(err, info){
				if(err){
					res.jsonp(500,{"success":"false","message":"internal error"});
				}
				else{
					console.log("yoyoyoyoy");
					res.jsonp(200,{"success":"true","message":"Order deleted Successfully"});
				}
			});
		}
	});
};
exports.billDetails=function(req,res){

	var	query="SELECT * from `orders` where Date(`created_at`) BETWEEN '"+req.params.startDate+"' AND '"+req.params.endDate+"'";
	console.log(query);
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(info.length>0){
			console.log(info);
			res.jsonp(200,{"success":"true","message":"Fetched Successfully","orders":info});
		}
		else{
			res.jsonp(404,{"success":"false","message":"Orders not found"});
		}
	});
};
exports.billDetailsById=function(req,res){
	var	query="SELECT * from `orders` where `id`='"+req.params.id+"' ";
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(info.length>0){
			console.log(info);
			query="SELECT * from `order_items` where `orders_id`='"+req.params.id+"' ";
			connection.query(query, function(err, items){
			if(err){
				console.log(err);
				res.jsonp(500,{"success":"false","message":"internal error"});
			}
			else if(info.length>0){
				console.log(info);
				res.jsonp(200,{"success":"true","message":"Fetched Successfully","order":info,"items":items});
			}
			else{
				res.jsonp(404,{"success":"false","message":"Items not found"});
			}
			});
		}
		else{
			res.jsonp(404,{"success":"false","message":"Orders not found"});
		}
	});

};
exports.update=function(req,res){
	var query=" UPDATE `orders` set `customer_name`='"+req.body.customer_name+"',`address`='"+req.body.address+"' where `id`='"+req.body.id+"'"
	connection.query(query, function(err, order){
				if(err)
				{
					res.jsonp(500,{"success":"false","message":"internal error"});
				}
				else if(order.affectedRows>0){
					res.jsonp(200,{"success":"true","message":"Updated Successfully"});
				}
				else
				{
					//console.log(user);
					res.jsonp(422, {"success":"false", "message": "Update Unsuccessful"});
				}
			});
};
exports.detailsByCurDate=function(req,res){
	var	query="SELECT `order_items`.`id`, `items`.`name`, `order_items`.`orders_id`, `order_items`.`items_id`, `order_items`.`quantity`, `order_items`.`price`, `order_items`.`weight`, `order_items`.`created_at`, `order_items`.`updated_at` FROM `order_items` LEFT JOIN `items` ON `items`.`id`=`order_items`.`items_id` WHERE DATE(`order_items`.`created_at`)=CURDATE()";
	console.log(query);
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else{
			console.log(info);
			res.jsonp(200,{"success":"true","message":"Fetched Successfully","reports":info});
		}
	});
};
exports.detailsByRangeDate=function(req,res){
	var	query="SELECT `order_items`.`id`, `items`.`name`, `order_items`.`orders_id`, `order_items`.`items_id`, `order_items`.`quantity`, `order_items`.`price`, `order_items`.`weight`, `order_items`.`created_at`, `order_items`.`updated_at` FROM `order_items` LEFT JOIN `items` ON `items`.`id`=`order_items`.`items_id` WHERE DATE(`order_items`.`created_at`)>='"+req.params.startDate+"' AND DATE(`order_items`.`created_at`)<='"+req.params.endDate+"'";
	console.log(query);
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.jsonp(500,{"success":"false","message":"internal error"});
		}
		else if(info.length>0){
			console.log(info);
			res.jsonp(200,{"success":"true","message":"Fetched Successfully","reports":info});
		}
		else{
			res.jsonp(404,{"success":"false","message":"Orders not found"});
		}
	});
};