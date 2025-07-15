const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//SSR
router.get('/', authController.isLoggedIn, viewsController.homePageData);

//client side rendering
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/user', authController.protect, viewsController.getAccount);
router.get('/addSuccess', authController.protect, viewsController.addSuccess);

module.exports = router;
