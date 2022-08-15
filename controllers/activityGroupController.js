const models = require("../models");

const { Op } = require("sequelize");

const { body, validationResult } = require('express-validator');

class activityGroupController {
    static async createActivityGroup(req, res, next) {
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
          const newActivity = await models.activity_groups.create({ ...req.body });

          return res.status(200).json({
            status: newActivity ? 'Success' : 'Not Found',
            message: "Success",
            data: newActivity
          });
        } catch (error) {
          console.log(error)
          next(error);
        }
    }

    static async GetActivityGroup(req, res, next) {
        const { email } = req.query
        const { id } = req.params
        const limit = 1000;
        try {
            let Activity = [];
            if (id && id != undefined) {
                Activity = await models.activity_groups.findOne({ 
                    where: { id },
                    offset: 0,
                    limit: limit,
                    attributes: ['id', 'title', ['createdAt','created_at']],
                    include: 'todo_items'
                });
            } else if (email && email != undefined) {
                Activity = await models.activity_groups.findAll({ 
                    where: { email },
                    offset: 0,
                    limit: limit,
                    attributes: ['id', 'title', ['createdAt','created_at']]
                });
            } else {
                Activity = await models.activity_groups.findAll({
                  attributes: ['id', 'title', ['createdAt', 'created_at']]
                });
            }

          return res.status(200).json({
            status: Activity ? 'Success' : 'Not Found',
            message: "Success",
            data: Activity
          });
        } catch (error) {
            next(error);
        }
    }

    static async deleteActivityGroup(req, res, next) {
        const { id } = req.params
        try {
          const Activity = await models.activity_groups.destroy({ where: { id } });

          return res.status(200).json({
            status: Activity ? 'Success' : 'Not Found',
            message: Activity ? 'Success' : `Activity with ID ${id} Not Found`,
            data: {}
          });
        } catch (error) {
            next(error);
        }
    }

    static async updateActivityGroup(req, res, next) {
        const { id } = req.params
        const { title } = req.body

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
          const Activity = await models.activity_groups.update({ title }, {
            where: {
              id
            },
            returning: true,
            plain: true
          });
          
          const act = await models.activity_groups.findOne({ 
            where: { id },
            attributes: ['id', 'title', 'email', ['createdAt','created_at'],['updatedAt', 'updated_at']],
          });

          return res.status(200).json({
            status: Activity ? 'Success' : 'Not Found',
            message: Activity ? 'Success' : `Activity with ID ${id} Not Found`,
            data: act
          });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = activityGroupController;