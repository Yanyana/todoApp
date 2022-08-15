'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todo_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activityGroupId: {
        type: Sequelize.INTEGER,
        references: { model: 'activity_groups', key: 'id' },
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      priority: {
        type: Sequelize.ENUM('very-high', 'high', 'normal', 'low', 'very-low'),
        defaultValue: 'very-high'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todo_items');
  }
};