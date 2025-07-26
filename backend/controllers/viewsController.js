const Success = require('./../models/successModel');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//SSR
/** Home Page */
exports.home = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const success_list = await Success.find().sort('-date');

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('home', {
    title: 'Welcome Success',
    success_list,
    user: res.locals.user,
    url: req.originalUrl,
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

  res.status(200).render('success-detail', {
    title: 'Success Detail',
    user,
    success,
    owner,
  });
});

/** User Success List */
exports.userSuccessList = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const successUserInfo = await User.findById(userId).select('name surname');
  const userSuccessList = await Success.find({ user: userId }).sort('-date');

  if (!userSuccessList) {
    return next(new AppError('There is no success with that id.', 404));
  }

  res.status(200).render('user-success-list', {
    title: 'User Success List',
    userId,
    user: res.locals.user,
    successUserName: `${successUserInfo.name} ${successUserInfo.surname}`,
    userSuccessList,
  });
});

/** User Profile */
exports.userProfile = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const userInfo = await User.findById(userId).select(
    '-__v -createdAt -updatedAt -role -theme',
  );

  if (!userInfo) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).render('user-profile', {
    title: 'User Profile',
    userInfo,
    user: res.locals.user,
  });
});

//Client Side Rendering
/** Login */
exports.getLoginForm = (req, res, next) => {
  const user = res.locals.user;

  if (user)
    return next(
      new AppError(
        `Kullanıcı giriş yaptığı için ${req.originalUrl.substring(1)} sayfasına giriş yapamazsınız!`,
        401,
      ),
    );

  res.status(200).render('login', {
    title: 'Log into your account',
    user,
  });
};

/** Add Success */
exports.addSuccess = (req, res) => {
  res.status(200).render('add-success', {
    title: 'Add Success',
    url: req.originalUrl,
    user: res.locals.user,
  });
};

/** Edit Success */
exports.editSuccess = (req, res) => {
  res.status(200).render('edit-success', {
    title: 'Edit Success',
    user: res.locals.user,
  });
};

/** User Edit */
exports.userEdit = (req, res) => {
  res.status(200).render('user-edit', {
    title: 'User Edit',
    user: res.locals.user,
  });
};
