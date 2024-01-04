'use strict';
const {
	Model
} = require('sequelize');
// const { User } = require('../models')
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
			type: DataTypes.BIGINT(20),
			allowNull: true,
			onDelete: 'cascade',
		},
		category: { type: DataTypes.STRING, allowNull: false }
	}, {
		sequelize,
		tableName: 'categories',
		modelName: 'Categories',
		underscored: true,
		paranoid: true
	});

	return Categories;
};
