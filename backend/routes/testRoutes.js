const express = require('express');
const moment = require('moment');

const authController = require('../controllers/authController');

const router = express.Router();

const testFn = (req, res) => {
  console.log('Cookies: ', req.cookies);
  res.status(200).json({
    title: 'Test Request',
    date: new Date().toLocaleString(),
    formatDate: moment(new Date()).format('D dddd MMMM YYYY HH:mm:ss'),
    user: res.locals.user,
  });
};

router.get('/', authController.isLoggedIn, testFn);

module.exports = router;
