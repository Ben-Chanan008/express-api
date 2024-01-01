const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Middlewares/AuthenticateMiddleware');

router.post('/', async (req, res, next) => {
	authenticateUser(req, res, next);
});

module.exports = router;
