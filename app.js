const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const dotenv = require('dotenv');
const { Buffer } = require('node:buffer');
const { generateKey } = require('./helpers');

const buf = Buffer.from('Express-API', 'utf8').toString('base64');

const app = express();
dotenv.config();

const PORT = process.env.APP_PORT || 5000;
const db = require('./models');

app.use(cors());
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', routes.register);
app.use('/api/auth', routes.login)

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server Running  on ${PORT}`);
		console.log(`APP_KEY: ${process.env.APP_KEY}`);
	});
});
