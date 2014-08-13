var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('request generated');
	console.log(req.body);
	next();
});

var loginModel=require('../../model/loginModel');
var loginController=require('../../controller/api/loginController');
// on routes that end in /login
// ----------------------------------------------------
router.route('/login')

	.post(loginModel.validate, loginController.validate)

// on routes that end in /bears/:id
// ----------------------------------------------------
router.route('/user/:id')

	// get the bear with that id
	.get(function(req, res) {
		res.json({ message: 'get with id Api' });
	})

	// update the bear with this id
	.put(function(req, res) {
		res.json({ message: 'Api for the put call !' });
	})

	// delete the bear with this id
	.delete(function(req, res) {
		res.json({ message: 'Api for the Delete !' });
	});

module.exports = router;