const express = require('express');
const router = express.Router();
const activityCtrl = require('../controllers/activity');

router.post('/', activityCtrl.createActivity);
router.get('/', activityCtrl.findAllActivities);
router.delete('/:id', activityCtrl.deleteActivity);
router.get('/:id', activityCtrl.getOneActivity);
router.patch('/:id', activityCtrl.updateActivity);

module.exports = router;
