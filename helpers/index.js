const jwt = require('jsonwebtoken');
let token;
const ALPHA_NUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateToken = (payload) => {
	token = jwt.sign(payload, process.env.APP_KEY, { expiresIn: '365 days' });

	return token;
}

const generateKey = (length) => {
	let result = '';

	const charactersLength = ALPHA_NUM.length;

	for (let i = 0;i < length;i++) {
		result += ALPHA_NUM.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

const authTkn = (req) => {
	let access_token = req.header('auth'),
		value,
		message;

	if (access_token) {
		try {
			const validTkn = jwt.verify(access_token, process.env.APP_KEY);
			if (validTkn) {
				req.token = validTkn;
				message = { msg: "Token is authorized!", authorized: true, token: req.token };
			} else
				message = { msg: "Token is not authorized", authorized: false }
		} catch (error) {
			console.log(error);
		}
	} else {
		message = { msg: "Token not provided", _headers: "auth" }
	}

	return message;
}

module.exports = {
	generateToken,
	generateKey,
	authTkn
}
