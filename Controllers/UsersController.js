const { User } = require('../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers');

async function getAll (req, res) {
	const user = await User.findAll();

	res.send(user);
}


async function createUser (req, res) {
	let body = req.body;

	const authschema = Joi.object({
		first_name: Joi.string().min(3).max(16).required(),
		last_name: Joi.string().min(3).max(16).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
		gender: Joi.string(),
		phone: Joi.string()
	})


	try {
		const validation = await authschema.validateAsync(body);
		User.findOne({ where: { email: validation.email } }).then(data => {
			if (!data)
				bcrypt.hash(validation.password, 10).then(hashedPassword => {
					User.create({
						...validation, password: hashedPassword
					}).then(responseData => {
						if (responseData)
							User.findOne({ where: { email: body.email } }).then(response => {
								if (response) {
									const userId = { id: response.dataValues.id };
									res.status(200).json({ message: "User Successfully created", access_token: generateToken(userId) });
								} else
									res.status(400).json({ message: "A random error occured" });
							});
						else
							res.json({ msg: "An error occured" }).status(422);
					});
				});
			else
				res.status(400).json({ message: "User Exists" });
		});
	} catch (error) {
		let errObj = error.details[0];

		res.json({ message: errObj.message });
	}
}

module.exports = {
	getAll,
	createUser
}
