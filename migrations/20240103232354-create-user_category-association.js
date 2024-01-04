'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		queryInterface.addConstraint('categories', {
			fields: ['user_id'],
			name: 'user_category_id',
			type: 'foreign key',
			onDelete: 'cascade',
			onUpdate: 'NO ACTION',
			references: {
				table: 'users',
				field: 'id',
			}
		});
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		queryInterface.removeConstraint('categories', 'user_category_id', {
			fields: ['user_id'],
			type: 'foreign key',
			onDelete: 'cascade',
			onUpdate: 'NO ACTION',
			references: {
				table: 'users',
				field: 'id',
			}
		});
	}
};
