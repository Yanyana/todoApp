const models = require("../models");

const { Op } = require("sequelize");

const { body, validationResult } = require('express-validator');

class todoController {
    static async createTodo(req, res, next) {

      let { activity_group_id, title } = req.body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorsLog = [];

        errors.array().forEach(element => {
          errorsLog.push({
            message: element.msg,
            type: "notNull Violation",
            path: element.param,
            value: element.value,
            origin: "CORE",
            instance: req.body,
            validatorKey: "is_null",
            validatorName: null,
            validatorArgs: []
          })            
        });

        return res.status(400).json({ 
          name: "BadRequest",
          message: errorsLog[0].message,
          code: 400,
          className: "bad-request",
          data: {},
          errors: errorsLog
        });
      }
      
        try {
          const newActivity = await models.todo_items.create({
            activityGroupId: activity_group_id,
            title: title
          });

          return res.status(200).json({
            status: newActivity ? 'Success' : 'Not Found',
            message: "Success",
            data: newActivity
          });
        } catch (error) {
            next(error);
        }
    }

    static async GetTodo(req, res, next) {        
        const { activity_group_id } = req.query
        const { id } = req.params
        const limit = 1000;
        try {
            let todoItems;

            if (id) {
                todoItems = await models.todo_items.findOne({ 
                    where: { activity_group_id: id },
                    offset: 0,
                    limit: limit,
                    attributes: ['id','title', 'activity_group_id', 'is_active', 'priority']
                });
            } else {
                todoItems = await models.todo_items.findAll({ 
                    where: { activity_group_id },
                    offset: 0,
                    limit: limit,
                    attributes: ['id','title', 'activity_group_id', 'is_active', 'priority']
                });
            }

          return res.status(200).json({
            status: todoItems ? 'Success' : 'Not Found',
            message: "Success",
            data: todoItems
          });
        } catch (error) {
            next(error);
        }
    }

    static async deleteTodo(req, res, next) {
        const { id } = req.params
        try {
          const Activity = await models.todo_items.destroy({ where: { id }, });

          return res.status(200).json({
            status: Activity ? 'Success' : 'Not Found',
            message: Activity ? 'Success' : `Activity with ID ${id} Not Found`,
            data: {}
          });
        } catch (error) {
            next(error);
        }
    }

    static async updateTodo(req, res, next) {
        const { id } = req.params
        const { title, is_active, priority } = req.body
        try {
          const Todos = await models.todo_items.update({
            title,
            is_active,
            priority
          }, {
            where: {
              id
            },
            returning: true,
            plain: true
          });

          return res.status(200).json({
            status: Todos ? 'Success' : 'Not Found',
            message: Todos ? 'Success' : `Activity with ID ${id} Not Found`,
            data: {}
          });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = todoController;