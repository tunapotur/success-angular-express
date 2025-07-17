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
    url: req.path,
    success_list,
    user: res.locals.user,
  });
});

exports.successDetail = catchAsync(async (req, res, next) => {
  // 1) Get the data
  const success = await Success.findById(req.params.id);

  if (!success) {
    return next(new AppError('There is no success with that id.', 404));
  }

  const user = res.locals.user;

  const owner = user
    ? success.user._id.toString() === user._id.toString()
    : undefined;

  res.status(200).render('successDetail', {
    title: 'Success Detail',
    url: req.path,
    user,
    success,
    owner,
  });
});

exports.userSuccessList = catchAsync(async (req, res) => {
  const userSuccessList = await Success.find({ user: req.params.userId });

  res.status(200).render('userSuccessList', {
    title: 'User Success List',
    url: req.path,
    userId: req.params.userId,
    userSuccessList,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
    url: req.path,
  });
};

exports.userProfile = (req, res) => {
  res.status(200).render('userProfile', {
    title: 'User Profile',
    url: req.path,
  });
};

exports.userEdit = (req, res) => {
  res.status(200).render('userEdit', {
    title: 'User Edit',
    url: req.path,
  });
};

exports.addSuccess = (req, res) => {
  res.status(200).render('addSuccess', {
    title: 'Add Success',
    url: req.path,
  });
};

exports.editSuccess = (req, res) => {
  res.status(200).render('editSuccess', {
    title: 'Edit Success',
    url: req.path,
  });
};
