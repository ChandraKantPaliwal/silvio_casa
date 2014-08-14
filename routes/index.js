var express = require('express');
var router = express.Router();


var userController=require('../controller/app/userController');
var userModel=require('../model/app/userModel');

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('request generated');
	console.log(req.body);
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



module.exports = router;
