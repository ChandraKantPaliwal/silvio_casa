var express = require('express');
var router = express.Router();


var userController=require('../controller/app/userController');
var userModel=require('../model/app/userModel');

var globalModel=require('../model/app/globalModel');

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('App request generated');
	console.log(req.body);
	console.log('App request middleware done');
	next();
});

/* GET home page. */
router.get('/', userModel.index, userController.index);

router.route('/login')

	.get(function(req, res) {
		res.render('login', { title: 'SILVIO CASA'});
	})

	.post(userModel.login, userController.login)

	.get(function(req, res) {
		res.json({ message: 'Api for the get method' });
	});

router.get('/logout', userModel.logout, userController.logout);


// routes for the item features
var itemController=require('../controller/app/itemController');
var itemModel=require('../model/app/itemModel');

router.route('/item/New')
	.get(globalModel.index, itemModel.index, itemController.index);

router.route('/item')
	.get(globalModel.index, itemModel.show, itemController.show)
	.post(globalModel.index, itemModel.save, itemController.save);
	// .get('/New', itemModel.index, itemController.index)
router.route('/item/:q')
		.get(globalModel.index, itemModel.filter, itemController.filter);
router.route('/itemDetails/:code')
		.get(globalModel.index, itemModel.detail, itemController.detail);


var silverPriceModel = require('../model/app/silverPriceModel');
var silverPriceController = require('../controller/app/silverPriceController');

router.route('/silverPrice')
	.get(globalModel.index, silverPriceModel.index, silverPriceController.index)
	.post(globalModel.index, silverPriceModel.save, silverPriceController.save);

var inventoryModel = require('../model/app/inventoryModel');
var inventoryController = require('../controller/app/inventoryController');

router.route('/inventory')
	.get(globalModel.index, inventoryModel.index, inventoryController.index);

var billModel = require('../model/app/billModel');
var billController = require('../controller/app/billController');

router.route('/bill')
	.get(globalModel.index, billModel.new, billController.new)
	.post(globalModel.index, billModel.save, billController.save);

router.route('/bill/:id')
	.get(globalModel.index, billModel.show, billController.show);

router.route('/deleteBill/:id')
	.get(globalModel.index, billModel.remove, billController.remove);

var invoiceModel = require('../model/app/invoiceModel');
var invoiceController = require('../controller/app/invoiceController');

router.route('/invoice')
	.get(globalModel.index, invoiceModel.index, invoiceController.index);


module.exports = router;