const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UsersController');
const multer = require('multer');
const formData = multer();


router.get('/', async (req, res) => {
	UserController.getAll(req, res);
});

router.post('/register', formData.none(), async (req, res) => {
	UserController.createUser(req, res);
});

module.exports = router;
