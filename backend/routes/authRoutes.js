const { Router } = require("express");

const { login, register, getUser } = require('../controllers/authController');

const router = Router();

//define routes
router.post('/register', register);
router.post('/login', login);
router.get('/getuser', getUser);

module.exports = router