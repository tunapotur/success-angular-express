exports.setLanguage = (req, res, next) => {
  res.locals.lng = req.language;
  next();
};
