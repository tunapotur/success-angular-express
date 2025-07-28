const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const expressMongoSanitize = require('@exortek/express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
const cors = require('cors');
const moment = require('moment');

// Localization
/* npm install i18next i18next-http-middleware i18next-fs-backend */
/* https://lokalise.com/blog/node-js-i18n-express-js-localization/ */
const i18next = require('i18next');
const FilesystemBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

//Error management imports
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//Router imports
const testRouter = require('./routes/testRoutes');
const userRouter = require('./routes/userRoutes');
const successRouter = require('./routes/successRouter');
const viewRouter = require('./routes/viewRoutes');

// Controller
const authController = require('./controllers/authController');

// Language Middleware
const { setLanguage } = require('./middleware/setLanguageMiddleware');

// Language Configuration
i18next
  .use(i18nextMiddleware.LanguageDetector) // Enables automatic language detection
  .use(FilesystemBackend) // Connects the file system backend
  .init({
    backend: {
      loadPath: path.join(process.cwd(), '/locales', '{{lng}}', '{{ns}}.json'), // Path to translation files
    },
    detection: {
      order: ['querystring', 'cookie'], // Priority: URL query string first, then cookies Query string sample: ?lng=en
      caches: ['cookie'], // Cache detected language in cookies
    },
    fallbackLng: ['en', 'tr-TR'], // Default language when no language is detected
    preload: ['en', 'tr-TR'],
  });

const app = express();

app.use(cors());

app.locals.moment = moment;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(
  helmet({
    referrerPolicy: false,
  }),
);

// Development logging
// Morgan middleware is used for web server information when development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // 100 request same ip
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(expressMongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

// Language
app.use(i18nextMiddleware.handle(i18next));
app.use(setLanguage);

// Test middleware
// Those routers contain controllers to check user requests
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES MIDDLEWARES
app.use('/', viewRouter);
app.use('/test', testRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/successes', successRouter);

/** Hatlı girilen url girişi uyarısı*/
app.all('{*splat}', authController.isLoggedIn, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
