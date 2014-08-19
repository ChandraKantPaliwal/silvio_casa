exports.new=function(req, res){
	res.render('bill', { title: 'Generate New Bill', bill:'active', priv:session.userPriv, username:session.userName});
}