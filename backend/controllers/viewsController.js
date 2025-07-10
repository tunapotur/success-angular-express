const Success = require('./../models/successModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.homePageData = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const success_list = await Success.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('home', {
    title: 'Welcome Success',
    success_list,
  });
});
