const models = require("../models");

const { Op } = require("sequelize");

const { body, validationResult } = require('express-validator');

class activityGroupController {
    static async createActivityGroup(req, res, next) {    
        try {
          const newActivity = await models.activity_groups.create({ ...req.body });

          return res.status(200).json({
            status: newActivity ? 'Success' : 'Not Found',
            message: "Success",
            data: newActivity
          });
        } catch (error) {
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
                });
            } else if (email && email != undefined) {
                Activity = await models.activity_groups.findAll({ 
                    where: { email },
                    offset: 0,
                    limit: limit,
                });
            } else {
                Activity = await models.activity_groups.findAll();
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
        try {
          const Activity = await models.activity_groups.update({ title }, {
            where: {
              id
            },
            returning: true,
            plain: true
          });
          console.log(Activity[1].dataValues)
          return res.status(200).json({
            status: Activity ? 'Success' : 'Not Found',
            message: Activity ? 'Success' : `Activity with ID ${id} Not Found`,
            data: {}
          });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = activityGroupController;