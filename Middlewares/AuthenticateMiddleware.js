const Joi = require('joi');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { User } = require('../models');
const { authTkn } = require('../helpers');

const authenticateUser = async (req, res, next) => {
	let body = req.body;

	let authSchema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
	});

	if (authTkn(req).authorized)
		try {
			const validatedBody = await authSchema.validateAsync(body, { allowUnknown: true, abortEarly: false });
			User.findOne({ where: { email: validatedBody.email } }).then(data => {
				if (data) {
					let dataValues = data.dataValues;
					bcrypt.compare(validatedBody.password, dataValues.password).then(matched => {
						if (matched) {
							console.log(req.session);
							req.session.logged_in_user = dataValues;
							res.status(200).json({ message: `Credentials Matched! Welcome Back at ${moment().format()}`, logged_in_user: req.session.logged_in_user, access_token: authTkn(req) });
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
	else
		if (!authTkn(req).authorized)
			res.status(422).json({ _message: authTkn(req) })
}

module.exports = {
	authenticateUser,
}
