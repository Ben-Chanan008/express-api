const { authTkn } = require('./AuthenticateMiddleware');

const logOut = async (req, res, next) => {

	authTkn(req, res);

	// if (authTkn(req).authorized)
	// 	req.session.destroy((err) => {
	// 		if (err)
	// 			console.log(err);
	// 		else {
	// 			res.status(200).json({ message: "Session Cleared! Please Login again!", route: '/api/users/auth' });
	// 			return next();
	// 		}
	// 	});
	// else
	// 	if (!authTkn(req).authorized)
	// 		res.status(422).json({ _message: authTkn(req) })
}

module.exports = {
	logOut
}
