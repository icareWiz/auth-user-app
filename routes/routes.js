const {Router} = require('express')
const {login, register, protect, logout} = require('../controllers/authController')
const {getAllUsers, getOne} = require("../controllers/userController");
const router = Router();

// register and login routes
router.post('/register', register)
router.post('/login', login)

// the protect function controls data access
router.get('/authorization:id/users', protect, getAllUsers)
router.get('/profils/user/:id', protect, getOne);
router.get('/user/:id/logout', logout);

module.exports = router;