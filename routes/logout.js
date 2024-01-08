const express = require('express');
const router = express.Router();
const { logOut } = require('../Middlewares/LogoutMiddleware');

router.get('/', (req, res, next) => {
	logOut(req, res, next);
});

module.exports = router;
