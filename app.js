import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session'
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import passport from 'passport';
import GitHubStrategy from 'passport-github';
GitHubStrategy.Strategy
import dotenv from 'dotenv';
dotenv.config()
import authRouter from './src/routes/auth.js';
import recipeRouter from './src/routes/recipes.js';

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const session = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
};

const strategy = new GitHubStrategy({
  clientID: process.env['GIT_CLIENT_ID'],
  clientSecret: process.env['GIT_CLIENT_SECRET'],
  callbackURL: process.env['GIT_CALLBACK_URL']
},
function(accessToken, refreshToken, profile, done) {
  // console.log(profile);
  return done(null, profile);
})

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

// enabling Sessions
app.use(expressSession(session))

// =============PASSPORT CONFIG!===============
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done)=>{
  done(null,user);
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})
// ==========================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);

const ensureAuthenticated =  function(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.status(401).json({
    message: "Authentication Failed, Please login to Continue"
});
}

app.use(ensureAuthenticated);

app.use('/recipes', recipeRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route Does Not Exist"});
});
export default app;
