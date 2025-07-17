const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//SSR
router.get('/', authController.isLoggedIn, viewsController.homePageData);
router.get(
  '/success/:id',
  authController.isLoggedIn,
  viewsController.successDetail,
);
router.get(
  '/:userId/userSuccessList',
  authController.protect,
  viewsController.userSuccessList,
);
//TODO userSuccessList üzerinden buraya erişilecek
router.get('/userProfile', authController.protect, viewsController.userProfile);

//client side rendering
// TODO get komutu put, add, delete şeklinde değiştirilecek
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/addSuccess', authController.protect, viewsController.addSuccess);
router.get(
  '/edit-success/:id',
  authController.protect,
  viewsController.editSuccess,
);
router.get('/userEdit', authController.protect, viewsController.userEdit);

module.exports = router;
