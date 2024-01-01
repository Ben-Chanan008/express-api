const express = require('express');
const router = express.Router();
const { getCategories } = require('../Controllers/CategoriesController');

router.get('/', (req, res) => {
	getCategories(req, res);
});

module.exports = router;
