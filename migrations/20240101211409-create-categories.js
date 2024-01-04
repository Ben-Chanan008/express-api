'use strict';
/** @type {import('sequelize-cli').Migration} */
// const { User } = require('../models');
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('categories', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.BIGINT(20).UNSIGNED,
				allowNull: true,
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('categories');
	}
};
