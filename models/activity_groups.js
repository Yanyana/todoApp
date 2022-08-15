'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.activity_groups.hasMany(models.todo_items);
    }
  }
  activity_groups.init({
    title: {
      type: DataTypes.STRING,
      values: {
        titleValidator(value) {
          if (value === null) {
            throw new Error("notNull Violation: activity_groups.activity_group_id cannot be null");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      values: {
        actGroupValidator(value) {
          if (value === null && value.isEmail() === false) {
            throw new Error("notNull Violation: email.activity_group_id cannot be null");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'activity_groups',
  });
  return activity_groups;
};