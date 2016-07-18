var TOKEN = '56AD94FD489CB2BE572765DA25A1D483968CF9069315A69F8A3EE12B80437DA1';

module.exports = function(req,res,next) {
	var bearer = req.get('Authorization');
	if(bearer){
		var token = bearer.split(" ")[1];
		if(token === TOKEN){
			next();
		}
		else {
			res.sendStatus(403);
		}
	}
	else {
		res.sendStatus(403);
	}
}