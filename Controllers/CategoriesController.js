const Joi = require('joi');
const { Categories } = require('../models');

const getCategories = (req, res) => {
	Categories.findAll().then(data => {
		res.send(data);
	});
}

const createCategory = async (req, res) => {
	let body = req.body;

	const categorySchema = Joi.object({
		category: Joi.string().required(),
	});


	try {
		const validatedBody = await categorySchema.validateAsync(body, { abortEarly: false, allowUnknown: true });

		Categories.create({ user_id: body.user_id, ...validatedBody }).then(response => {
			if (response)
				res.status(200).json({ message: "Category Created Successfully" });
			else
				res.status(422).json({ message: "An Error Occured" });
		});
	} catch (error) {
		let errObj = error.details[0];

		res.status(500).json({ message: errObj.message });
	}
}

module.exports = {
	getCategories,
	createCategory
}
