'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.activity_groups.belongsTo(models.todo_items, {
        foreignKey: "activity_group_id",
        targetKey: "id",
      });
    }
  }
  todo_items.init({
    title: {
      type: DataTypes.STRING,
      values: {
        titleValidator(value) {
          if (value === null) {
            throw new Error("notNull Violation: todo_items.title cannot be null");
          }
        }
      }
    },
    activity_group_id: {
      type: DataTypes.INTEGER,
      values: {
        actGroupValidator(value) {
          if (value === null) {
            throw new Error("notNull Violation: todo_items.activity_group_id cannot be null");
          }
        }
      }
    },
    is_active: DataTypes.BOOLEAN,
    priority: {
      type: DataTypes.ENUM,
      values: ['very-high', 'high', 'normal', 'low', 'very-low']
    }
  }, {
    sequelize,
    modelName: 'todo_items',
  });

  return todo_items;
};