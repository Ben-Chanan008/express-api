const Joi = require('joi');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { User } = require('../models');

const authenticateUser = async (req, res, next) => {
	let body = req.body;

	let authSchema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
	});

	try {
		const validatedBody = await authSchema.validateAsync(body, { allowUnknown: true, abortEarly: false });
		User.findOne({ where: { email: validatedBody.email } }).then(response => {
			if (response)
				User.findOne({ where: { email: validatedBody.email } }).then(data => {
					if (data) {
						let dataValues = data.dataValues;
						bcrypt.compare(validatedBody.password, dataValues.password).then(matched => {
							if (matched) {
								res.status(200).json({ message: `Credentials Matched! Welcome Back at ${moment().format()}` });
								// next();
							} else
								res.status(400).json({ message: "Credentials Not Matched! Please provide correct Information" });
						});
					} else
						res.status(500).json({ message: "An Unknown Error Occured!" });
				});
			else
				res.status(422).json({ message: "Credentials are Incorrect!" })
		});
	} catch (error) {
		let errObj = error.details[0];

		res.json({ message: errObj.message });
	}
}

module.exports = {
	authenticateUser
}
