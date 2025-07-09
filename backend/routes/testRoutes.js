const express = require('express');
const moment = require('moment');

const router = express.Router();

router.get('/', (req, res) => {
  const isLoggedIn = req.cookies.jwt ? true : false;

  res.status(200).json({
    title: 'Test Request',
    data: new Date().toLocaleString(),
    formatDate: moment(new Date()).format('D dddd MMMM YYYY HH:mm:ss'),
    isLoggedIn,
  });
});

module.exports = router;
