exports.new=function(req, res, next){
	next();
}
exports.save=function(req, res, next){
	next();
}
exports.remove=function(req, res, next){
	console.log(req.params.id);
	console.log("model called");
	next();
}