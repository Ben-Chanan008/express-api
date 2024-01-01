const { categories } = require('../models');

const getCategories = (req, res) => {
	categories.findAll().then(data => {
		res.send(data);
	});
}

const createCategory = (req, res) => { }

module.exports = {
	getCategories
}
