const express = require('express');
const router = express.Router();
const activityCtrl = require('../controllers/activity');


router.post('/',  activityCtrl.createActivity);

module.exports = router;
