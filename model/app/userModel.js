exports.index=function(req, res, next){
	// validation test and previlage test
	next();
};

exports.login = function(req, res, next){
	console.log("yes requet done");
	next();
}

exports.logout=function(req, res, next){
	// validation test and previlage test
	next();
};