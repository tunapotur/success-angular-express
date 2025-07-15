const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//SSR
router.get('/', authController.isLoggedIn, viewsController.homePageData);

//client side rendering
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/user', authController.protect, viewsController.getAccount);

module.exports = router;
