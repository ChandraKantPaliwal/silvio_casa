exports.index=function(req, res){
	// api made here
	if(session.userId!="undefined"){
		res.render('index', { title: 'Express' });
	}
	else{
		res.redirect('/login');
	}
};

exports.logout = function(req, res){
   req.session.destroy();
   res.redirect('/');
   //console.log(moment("04/13/2014", "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss'));
};