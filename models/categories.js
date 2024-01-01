'use strict';
const {
	Model
} = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
	class Categories extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate (models) {
			// define association here
		}
	}
	Categories.init({
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: User,
				key: 'id'
			}
		},
		category: { type: DataTypes.STRING, allowNull: false }
	}, {
		sequelize,
		modelName: 'Categories',
	});

	return Categories;
};
