exports.restrictAccess = ({ failureRedirect }) => {
  return (req, res, next) => {
    if(!req.isAuthenticated()){
      return res.redirect(failureRedirect);
    }

    next();
  };
};

exports.publicOnly = ({ failureRedirect }) => {
  return (req, res, next) => {
    if(req.isAuthenticated()){
      return res.redirect(failureRedirect);
    }

    next();
  };
};
