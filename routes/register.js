const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UsersController');


router.get('/', async (req, res) => {
	UserController.getAll(req, res);
});

router.post('/register', async (req, res) => {
	UserController.createUser(req, res);
});

module.exports = router;
