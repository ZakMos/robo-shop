exports.fixPrecision = (number, precision = 2) => {
  return parseFloat(number.toFixed(precision));
};

exports.capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
};
