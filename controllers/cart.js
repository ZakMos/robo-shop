/**
 * HELPERS
 */
const {fixPrecision} = require('../lib/helpers');

/**
 * MODLES
 */
const Product = require('../models/product');

/**
 * Get cart from session
 */
exports.get = (req, res) => {
  const { cart } = req.session;
  const {totalQty, totalPrice} = cart;
  const vat = 19;
  // Fixes rounding errors
  const vatPrice = fixPrecision(totalPrice / 100 * vat);

  res.render('shop/cart', {
    title: 'Cart',
    items: cart.toArray(),
    totalQty,
    totalPrice,
    vat,
    vatPrice,
    finalPrice: fixPrecision(totalPrice + vatPrice)
  });
};

/**
 * Add item to cart in session
 */
exports.add = async (req, res, next) => {
  // Get the id from the route params
  const { id } = req.params;

  try {
    // find the product
    const product = await Product.findById(id);

    // Add product to cart
    req.session.cart.add(product.id, product);

    // Add a flash messege to session
    req.flash('cart-info', 'Item added to cart');

    // Redirect the request back to where it was made from
    res.redirect('back');
  } catch (err) {
    next(err);
  }
};

/**
 * Remove product from cart in session
 */
exports.remove = (req, res) => {
  // Get the id from the route params
  const { id } = req.params;

  // Remove product from cart
  req.session.cart.remove(id);

  // Redirect the request back to where it was made from
  res.redirect('back');
};

/**
 * Remove all of one product from cart
 */
exports.removeAll = (req, res) => {
  // Get the id from the route params
  const { id } = req.params;

  // Remove entire cart item from cart
  req.session.cart.removeAll(id);

  // Redirect the request back to where it was made from
  res.redirect('back');
};
