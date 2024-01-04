'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT(20).UNSIGNED
			},
			first_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			last_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			password: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			gender: {
				type: Sequelize.ENUM,
				defaultValue: null,
				values: ['male', 'female']
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email_verified_at: {
				type: Sequelize.DATE,
				defaultValue: null
			},
			deleted_at: {
				type: Sequelize.DATE,
				defaultValue: null
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
	}
};
