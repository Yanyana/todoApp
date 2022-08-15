var express = require('express');
var router = express.Router();
const activityGroupController = require("../controllers/activityGroupController");

const { body } = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post("/activity-groups", activityGroupController.createActivityGroup);
router.post('/activity-groups', 
  body('title')
  .isLength({ min: 1 })
  .withMessage('notNull Violation: activity_groups.title cannot be null'), (req, res, next) => {
  activityGroupController.createActivityGroup(req, res, next)
});

router.get('/activity-groups', (req, res, next) => {
  activityGroupController.GetActivityGroup(req, res, next)
});

router.get('/activity-groups/:id', (req, res, next) => {
  activityGroupController.GetActivityGroup(req, res, next)
});

router.delete('/activity-groups/:id', (req, res, next) => {
  activityGroupController.deleteActivityGroup(req, res, next)
});

router.patch('/activity-groups/:id', body('title')
.isLength({ min: 1 })
.withMessage('notNull Violation: activity_groups.title cannot be null'), (req, res, next) => {
  activityGroupController.updateActivityGroup(req, res, next)
});

module.exports = router;
