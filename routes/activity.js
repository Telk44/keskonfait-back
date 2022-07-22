const express = require('express');
const router = express.Router();
const activityCtrl = require('../controllers/activity');
const auth = require('../middleware/auth')

router.post('/', auth, activityCtrl.createActivity);
router.get('/', activityCtrl.findAllActivities);
router.delete('/:id', activityCtrl.deleteActivity);
router.get('/:id', activityCtrl.getOneActivity);
router.patch('/:id', activityCtrl.updateActivity);
router.get('/user/:id', auth, activityCtrl.getUserActivities);

module.exports = router;
