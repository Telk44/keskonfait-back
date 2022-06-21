const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl .signup);
router.post('/login', userCtrl .login);
router.delete('/:id', auth, userCtrl .deleteAccount);
router.get('/:id', auth, userCtrl .getOneAccount);
router.put('/:id', auth, userCtrl .modifyAccount);
router.get('/',  userCtrl .getAllAccounts);

module.exports = router;
