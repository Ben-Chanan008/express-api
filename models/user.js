'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate (models) {
			// define association here
		}
	}
	User.init({
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		gender: {
			type: DataTypes.ENUM,
			defaultValue: null,
			values: ['male', 'female']
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email_verified_at: {
			type: DataTypes.DATE,
			defaultValue: null
		},
		deleted_at: {
			type: DataTypes.DATE,
			defaultValue: null
		},
	}, {
		sequelize,
		modelName: 'User',
		underscored: true,
		paranoid: true
	});
	return User;
};
