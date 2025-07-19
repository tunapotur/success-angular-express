const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//SSR
router.get('/', authController.isLoggedIn, viewsController.homePageData);
router.get(
  '/success-detail/:id',
  authController.isLoggedIn,
  viewsController.successDetail,
);
router.get(
  '/:userId/user-success-list',
  authController.isLoggedIn,
  viewsController.userSuccessList,
);
router.get(
  '/:userId/user-profile',
  authController.isLoggedIn,
  viewsController.userProfile,
);

//client side rendering
// TODO get komutu put, add, delete şeklinde değiştirilecek
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/add-success', authController.protect, viewsController.addSuccess);
router.get(
  '/edit-success/:id',
  authController.protect,
  viewsController.editSuccess,
);
router.get('/user-edit', authController.protect, viewsController.userEdit);

module.exports = router;
