exports.index=function(req, res, next){
	if(session.userId){
		next();
	}
	else{
		res.redirect('/login');
	}
};