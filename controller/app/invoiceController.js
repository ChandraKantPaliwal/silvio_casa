exports.index=function(req, res){

res.render('invoice', { title: 'Invoice', priv:session.userPriv, username:session.userName});

};