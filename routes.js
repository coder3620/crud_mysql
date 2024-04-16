const express = require('express');
const router = express.Router();
const controller = require('./controller');
const Middleware  = require('./middleware');

router.post('/login', controller.loginUser);
router.post('/createUser', Middleware.authorization,controller.createUser);
router.get('/userListing', Middleware.authorization, controller.getAllUsers);
router.get('/getUserById', Middleware.authorization, controller.getUserById);
router.put('/updateUserId', Middleware.authorization, controller.updateUser);
router.delete('/deleteUserID', Middleware.authorization, controller.deleteUser);


module.exports = router;
