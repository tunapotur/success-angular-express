const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//*SSR
/** Home Page */
router.get('/', authController.isLoggedIn, viewsController.homePageData);

/** Success Detail */
router.get(
  '/success-detail/:id',
  authController.isLoggedIn,
  viewsController.successDetail,
);

/** User Success List */
router.get(
  '/:userId/user-success-list',
  authController.isLoggedIn,
  viewsController.userSuccessList,
);

/** User Profile */
router.get(
  '/:userId/user-profile',
  authController.isLoggedIn,
  viewsController.userProfile,
);

// TODO hatalı işlemler için web sayfası düzeni oturtulacak.
//*Client Side Rendering

// TODO get komutu put, add, delete şeklinde değiştirilecek
/** Login */
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);

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
