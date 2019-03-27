/**
 * Renders login page
 */
exports.login = (req, res) => {
  res.render('user/login', {
    // read signup flash message from session
    errors: req.flash('error'),
    csrfToken: req.csrfToken()
  });
};

/**
 * Renders signup page
 */
exports.signup  = (req, res) => {
  res.render('user/signup', {
    // read signup flash message from session
    errors: req.flash('error'),
    csrfToken: req.csrfToken()
  });
};

/**
 * Renders profile page
 */
exports.profile  = (req, res) => {
  res.render('user/profile');
};

/**
 * Logs out a user
 */
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
