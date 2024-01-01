const jwt = require('jsonwebtoken');
let token;
const ALPHA_NUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateToken = (payload) => {
	token = jwt.sign(payload, process.env.APP_KEY);

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

module.exports = {
	generateToken,
	generateKey
}
