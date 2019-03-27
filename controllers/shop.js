/**
 * MODELS
 */
const Product = require('../models/product');

/**
 * Controllers
 */
exports.get = async (req, res, next) => {
  try {
    const products = await Product.find().exec();

    res.render('shop/index', {
      title: 'Products',
      // Reqad cart info flash messages from session
      messages: req.flash('cart-info'),
      products
    });
  } catch (err) {
    next(err);
  }
};
