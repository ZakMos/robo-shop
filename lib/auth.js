/**
 * EXTERNAL DEPS
 */
const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const { validationResult } = require('express-validator/check');

/**
 * HELPERS
 */
const {capitalize} = require('./helpers');

/**
 * MODELS
 */
const User = require('../models/user');

/**
 * PASSPORT HELPERS
 */
const validateRequest = (req, done) => {
  // Get any validation errors from the request
  const errors = validationResult(req)
    // Format the error objects into human friendly messages
    .formatWith(error => capitalize(`${error.param} ${error.msg}.`));

  // If there are errors...
  if(!errors.isEmpty()){
    // ... convert them to an araay
    const messages = errors.array();
    // ... redirect to failure page with a flash message
    done(null, false, req.flash('error', messages));
    return false;
  }

  return true;
};

/**
 * GLOBAL CONFIG
 */
// Configure passport to only save the user id into session
passport.serializeUser((user, done) => {
  // Calls the done middleware to finalize the serialization, first arg is null, since we don't have an error
  done(null, user.id);
});

// Configure passport to get the user back from the id stored in session
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by id
    const user = await User.findById(id).exec();
    // Calls the done middleware with a user object
    done(null, user);
  } catch(err) {
    // Calls rthe error handling middleware
    done(err);
  }
});


/**
 * STRATEGIES
 */

// Configure general passport settings
const strategyConfig = {
  // define the property name to use as the username
  usernameField: 'email',
  // define the property name to use as the password
  passwordField: 'password',
  // pass the request object to the callback
  passReqToCallback: true
};

// Define a strategy for signup
passport.use('local.signup', new LocalStrategy(
  strategyConfig,
  async (req, email, password, done) => {
    // Check if request is valid
    if(!validateRequest(req, done)) return;

    try {
      // Try to create a new user
      const user = await new User({email, password}).save();
      // If successul, redirect to success page
      done(null, user);
    } catch(err) {
      // Check for unique field error from mongo...
      if(err.name === 'MongoError' && err.code === 11000){
        // ... redirect to failure page with a flash message
        return done(null, false, {message: `${email} already exists.`});
      }

      return done(err);
    }
  }));

// Define strategy for login
passport.use('local.login', new LocalStrategy(
  strategyConfig,
  async (req, email, password, done) => {
    // Check if request is valid
    if(!validateRequest(req, done)) return;

    try {
      // Try to find an existing user with that email
      const user = await User.findOne({email}).exec();

      // If the user doesn't exist of the password doesn't match...
      if(!user || !await user.authenticate(password)){
        // ... redirect to failure page with a flash message
        return done(null, false, {message: 'Incorrect email or password.'});
      }
      // If successful redirect to success page
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
