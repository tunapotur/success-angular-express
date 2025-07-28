const Success = require('./../models/successModel');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//SSR
/** Home Page */
exports.home = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const success_list = await Success.find().sort('-date');

  const browserLang = req.headers['accept-language'];
  console.log('Browser Dili:', browserLang);

  // res.cookie('i18next', req.headers['accept-language']);

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('home', {
    title: req.t('home.title'),
    success_list,
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
    title: req.t('success-detail.title'),
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
    title: req.t('user-success-list.title'),
    pageHeader: req.t('user-success-list.page-header', {
      userName: `${successUserInfo.name} ${successUserInfo.surname}`,
    }),
    noSuccess: req.t('user-success-list.no-success'),
    userId,
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
    title: req.t('user-profile.title'),
    pageHeader: req.t('user-profile.page-header', {
      userName: `${userInfo.name} ${userInfo.surname}`,
    }),
    userInfo,
  });
});

//Client Side Rendering
/** Login */
exports.getLoginForm = (req, res, next) => {
  if (res.locals.user)
    return next(
      new AppError(
        req.t('login.error', { page: req.originalUrl.substring(1) }),
        401,
      ),
    );

  res.status(200).render('login', {
    title: req.t('login.title'),
  });
};

/** Add Success */
exports.addSuccess = (req, res) => {
  res.status(200).render('add-success', {
    title: req.t('add-success.title'),
    url: req.originalUrl,
  });
};

/** Edit Success */
exports.editSuccess = (req, res) => {
  res.status(200).render('edit-success', {
    title: req.t('edit-success.title'),
  });
};

/** User Edit */
exports.userEdit = (req, res) => {
  res.status(200).render('user-edit', {
    title: req.t('user-edit.title'),
  });
};
