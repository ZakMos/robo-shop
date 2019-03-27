const bcrypt = require('bcrypt');

exports.encrypt = async (text) => {
  if(!text) return '';

  return await bcrypt.hash(text, 10);
};

exports.compare = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};
