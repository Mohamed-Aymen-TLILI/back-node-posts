const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

const auth = require('../middleware/auth');

// Routes pour les utilisateurs
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user/:id', auth.auth, userController.getOneUser);
router.put('/user/:id', auth.auth, userController.modifyUser);
router.delete('/user/:id', auth.auth, userController.deleteUser);

// Routes pour les admins
router.get('/admin/users/:id', auth.authAdmin, userController.getAllUsersByAdmin);
router.put('/admin/users/:id', auth.authAdmin, userController.modifyUserRole);
router.delete('/admin/users/:id', auth.authAdmin, userController.deleteUserByAdmin);

module.exports = router;