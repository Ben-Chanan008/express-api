const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const dotenv = require('dotenv');
const { Buffer } = require('node:buffer');
const { generateKey, sessionChecker } = require('./helpers');
const session = require('express-session');
const { store } = require('./Middlewares/AuthenticateMiddleware');

const buf = Buffer.from('Express-API', 'utf8').toString('base64');

const app = express();
dotenv.config();

// let corsOptions = {
// 	origin: `http://localhost:${process.env.APP_PORT}/api/users/auth`,
// 	optionsSuccessStatus: 200
// }

const PORT = process.env.APP_PORT || 5000;
const db = require('./models');

app.use(cors());
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	// res.append('Access-Control-Allow-Origin', ['*']);
	// res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Expose-Headers', ['*']);
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(session({
	name: 'express-api',
	secret: 'Express-api',
	resave: false,
	saveUninitialized: false,
	store
}));

app.use('/api/users', routes.register);
app.use('/api/users/auth', routes.login);
app.use('/api/categories', routes.categories);
app.use('/api/auth/logout', routes.logout);

db.sequelize.sync({ alter: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`Server Running  on ${PORT}`);
		console.log(`APP_KEY: ${process.env.APP_KEY}`);
		// console.log(`APP_KEY: ${process.env.APP_KEY}`);
	});
});
