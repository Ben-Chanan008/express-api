const express = require('express');
const router = express.Router();
const { authenticateUser, authTkn } = require('../Middlewares/AuthenticateMiddleware');
const multer = require('multer');
const formData = multer();

router.post('/', formData.none(), async (req, res, next) => {
	authenticateUser(req, res, next);
});

router.get('/', async (req, res) => {
	authTkn(req, res);
})

module.exports = router;
