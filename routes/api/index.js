var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/login')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		res.json({ message: 'Api for post method' });
	})
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/user/:bear_id')

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