const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
// const { changeLanguage } = require('../controllers/languageController');

const router = express.Router();

// Check is user logged in all routes after this middleware
router.use(authController.isLoggedIn);

//*SSR
/** Home Page */
router.get('/', viewsController.home);

/** Success Detail */
router.get('/success-detail/:id', viewsController.successDetail);

/** User Success List */
router.get('/:userId/user-success-list', viewsController.userSuccessList);

/** User Profile */
router.get('/:userId/user-profile', viewsController.userProfile);

// TODO get komutu put, add, delete şeklinde değiştirilecek

//*Client Side Rendering
/** Login */
router.get('/login', viewsController.getLoginForm);

/** Protected Routes */

/** Add Success */
router.get('/add-success', authController.protect, viewsController.addSuccess);

/** Edit Success */
router.get(
  '/edit-success/:id',
  authController.protect,
  viewsController.editSuccess,
);

/** User Edit */
router.get('/user-edit', authController.protect, viewsController.userEdit);

module.exports = router;
