const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { User } = require('../models');
const { generateToken } = require('../helpers');
const session = require('express-session');
const store = new session.MemoryStore();


const authenticateUser = async (req, res, next) => {
	let body = req.body;

	let authSchema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
	});

	// if (authTkn(req).authorized)
	try {
		const validatedBody = await authSchema.validateAsync(body, { allowUnknown: true, abortEarly: false });
		User.findOne({ where: { email: validatedBody.email } }).then(data => {
			if (data) {
				let dataValues = data.dataValues;
				bcrypt.compare(validatedBody.password, dataValues.password).then(matched => {
					if (matched) {
						const userId = { id: dataValues.id };
						res.status(200).json({ message: `Credentials Matched! Welcome Back at ${moment().format()}`, access_token: generateToken(userId) });
						return next();
					} else
						res.status(400).json({ message: "Credentials Not Matched! Please provide correct Information" });
				});
			} else
				res.status(500).json({ message: "An Unknown Error Occured!" });
		});
	} catch (error) {
		let errObj = error.details[0];

		res.json({ message: errObj.message });
	}
	// else
	// 	if (!authTkn(req).authorized)
	// 		res.status(422).json({ _message: authTkn(req) })
}


const authTkn = (req, res) => {
	let access_token = req.header('auth'),
		value,
		message;

	if (access_token) {
		try {
			const validTkn = jwt.verify(access_token, process.env.APP_KEY);
			if (validTkn) {
				req.token = validTkn;
				User.findOne({ where: { id: req.token.id } }).then(data => {
					if (data) {
						let user = data.dataValues;
						res.status(200).json({ msg: "Token is authorized!", authorized: true, token: req.token, user });
					}
				}).catch(err => console.log(err));
			}
		} catch (error) {
			console.log(error);
			res.status(400).json({ msg: "Token has expired", authorized: false })
		}
	} else {
		res.status(422).json({ msg: "Token not provided", _headers: "auth" })
	}

	return message;
}


module.exports = {
	authenticateUser,
	authTkn
}
