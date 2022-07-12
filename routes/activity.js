const express = require('express');
const router = express.Router();
const activityCtrl = require('../controllers/activity');
// const auth = require('../middleware/auth');


router.post('/', activityCtrl.createActivity);
router.get('/', activityCtrl.findAllActivities);
router.delete('/:id', activityCtrl.deleteActivity);
router.get('/:id', activityCtrl.getOneActivity)

module.exports = router;
