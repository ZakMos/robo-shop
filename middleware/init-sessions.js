/**
 * CONFIG
 */
const shop = require('../config/site');

/**
 * MODELS
 */
const Cart = require('../models/cart');

/**
 * Initializes a cart in session from a previous cart or creates a
 * new one if non found
 */
exports.initCart = (req, res, next) => {
  req.session.cart = new Cart(req.session.cart);

  next();
};

exports.setLocals = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();
  res.locals.isLoggedIn = isLoggedIn;
  res.locals.session = req.session;
  res.locals.shop = shop;

  if(isLoggedIn){
    res.locals.username = req.user.email;
  }

  next();
};
