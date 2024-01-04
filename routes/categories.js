const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../Controllers/CategoriesController');

router.get('/', (req, res) => {
	getCategories(req, res);
});

router.post('/create', (req, res) => {
	createCategory(req, res);
});

module.exports = router;
