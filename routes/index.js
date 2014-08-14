var express = require('express');
var router = express.Router();


var userController=require('../controller/app/userController');
var userModel=require('../model/app/userModel');

/* GET home page. */
router.get('/', userModel.index, userController.index);

// res.render('index', { title: 'Express' });

// router.get('/login');

router.get('/login', function(req, res){
	res.render('login', { title: 'Login' });
});

module.exports = router;
