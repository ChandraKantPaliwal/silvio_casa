var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('api request generated');
	console.log(req.body);
	console.log('request body printed');
	next();
});

var loginModel=require('../../model/api/loginModel');
var loginController=require('../../controller/api/loginController');

var userModel=require('../../model/api/userModel');
var userController=require('../../controller/api/userController');

var itemModel=require('../../model/api/itemModel');
var itemController=require('../../controller/api/itemController');

var silverPriceModel=require('../../model/api/silverPriceModel');
var silverPriceController=require('../../controller/api/silverPriceController');
// on routes that end in /login
// ----------------------------------------------------
router.route('/login')
	.post(loginModel.validate, loginController.validate);

// on routes that results in update,delete,add,fetch...
// ----------------------------------------------------

// router.route('/updatePassword')

// 	.put(userModel.update_password, userController.update_password);

// router.route('/deleteUser/:id')

// 	.delete(userModel.deleteUser,userController.delete_user);

// router.route('/addUser')

// 	.post(userModel.addUser,userController.add_new_user);

// router.route('/fetchUser/:id')

// 	.get(userModel.fetchUser,userController.fetch_user_details)

//on routes that are associated with items
//-----------------------------------------------------
router.route('/itemTypes/:user_id')
	.get(itemModel.fetch_item_types,itemController.fetch_item_types);

router.route('/item')
	.get(itemModel.index, itemController.index)
	.post(itemModel.save, itemController.save)
	.put(itemModel.update, itemController.update)
	.delete(itemModel.delete,itemController.delete)


//on routes that are associated with silverPrice
//-----------------------------------------------------
router.route('/silverPrice')
	.get(silverPriceModel.index, silverPriceController.index)
	
// on routes that end in /bears/:id
// ----------------------------------------------------
// router.route('/user/:id')

// 	// get the bear with that id
// 	.get(function(req, res) {
// 		res.json({ message: 'get with id Api' });
// 	})

// 	// update the bear with this id
// 	.put(function(req, res) {
// 		res.json({ message: 'Api for the put call !' });
// 	})

// 	// delete the bear with this id
// 	.delete(function(req, res) {
// 		res.json({ message: 'Api for the Delete !' });
// 	});

module.exports = router;