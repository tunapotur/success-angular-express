const Success = require('./../models/successModel');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//SSR
/** Home Page */
exports.homePageData = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const success_list = await Success.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('home', {
    title: 'Welcome Success',
    success_list,
    user: res.locals.user,
  });
});

/** Success Detail */
exports.successDetail = catchAsync(async (req, res, next) => {
  // 1) Get the data
  const success = await Success.findById(req.params.id);

  if (!success) {
    return next(new AppError('There is no success with that id.', 404));
  }

  const user = res.locals.user;

  const owner =
    user && success.user._id.toString() === user._id.toString() ? true : false;

  res.status(200).render('successDetail', {
    title: 'Success Detail',
    user,
    success,
    owner,
  });
});

/** User Success List */
exports.userSuccessList = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const userSuccessList = await Success.find({ user: userId });

  if (!userSuccessList) {
    return next(new AppError('There is no success with that id.', 404));
  }

  res.status(200).render('userSuccessList', {
    title: 'User Success List',
    userId,
    userSuccessList,
  });
});

/** User Profile */
exports.userProfile = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).select(
    '-__v -createdAt -updatedAt -role -theme',
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).render('userProfile', {
    title: 'User Profile',
    user,
  });
});

exports.wrongPage = (req, res) => {
  res.status(200).render('wrongPage', { title: 'Wrong Page' });
};

//Client Side Rendering
/** Login */
exports.getLoginForm = (req, res) => {
  const user = res.locals.user;

  if (user) res.redirect('/wrong-page');

  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

/** Add Success */
exports.addSuccess = (req, res) => {
  res.status(200).render('addSuccess', {
    title: 'Add Success',
  });
};

/** Edit Success */
exports.editSuccess = (req, res) => {
  res.status(200).render('editSuccess', {
    title: 'Edit Success',
  });
};

/** User Edit */
exports.userEdit = (req, res) => {
  res.status(200).render('userEdit', {
    title: 'User Edit',
    user: req.user,
  });
};
