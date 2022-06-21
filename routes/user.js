const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const userMiddleware = require('../middleware/user');

router.post('/signup', userMiddleware, userCtrl .signup);
router.post('/login', userCtrl .login);
router.delete('/:id', auth, userCtrl .deleteAccount);
router.get('/:id', auth, userCtrl .getOneAccount);
router.put('/:id', auth, userCtrl .modifyAccount);
router.get('/',  userCtrl .getAllAccounts);

router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;
