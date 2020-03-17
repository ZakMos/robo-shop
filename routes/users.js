/**
 * EXTRANAL DEPS
 */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const csrf = require('csurf');

/**
 * MIDDLEWARE
 */
const { restrictAccess, publicOnly } = require('../middleware/access');

/**
 * HELPERS
 */
const passport = require('../lib/auth');



/**
 * CONTROLLERS
 */
const userController = require('../controllers/user');

// Protect user routes for CSRF attacks
router.use(csrf());

router.get('/logout', restrictAccess({
  failureRedirect: '/user/signup'
}), userController.logout);

router.get('/profile', restrictAccess({
  failureRedirect: '/user/signup'
}), userController.profile);


router.use(publicOnly({
  failureRedirect: '/'
}));

// Define signup route
router.route('/signup')
  // Call the signup controller to render signup page
  .get(userController.signup)
  // Authenticate user with signup strategyand redirect
  .post(
    check('email')
      .not().isEmpty()
      .isEmail().withMessage('must be a valid email address'),
    check('password')
      .not().isEmpty()
      .isLength({min: 8}).withMessage('must be at least 8 characters long')
      .matches(/[a-z]/).withMessage('must contain lowercase letters')
      .matches(/[A-Z]/).withMessage('must contain uppercase letters')
      .matches(/\d/).withMessage('must contain numbers')
      .matches(/[@$!%*?&]/).withMessage('must contain a special character (@, $, !, %, *, ?, &)'),
    passport.authenticate('local.signup', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/signup',
      // enable flash messages
      failureFlash: true
    }));



router.route('/login')
  .get(userController.login)
  .post(
    check('email')
      .not().isEmpty()
      .isEmail().withMessage('must be a valid email address'),
    check('password')
      .not().isEmpty(),
    passport.authenticate('local.login', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/login',
      // enable flash messages
      failureFlash: true
    }));

module.exports = router;
