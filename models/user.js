const mongoose = require('mongoose');
const encryption = require('../lib/encryption');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await encryption.encrypt(this.password);
  next();
});

UserSchema.methods = {
  toJSON: function(){
    const user = this.toObject();

    delete user.password;

    return user;
  },
  authenticate: async function(password){
    return await encryption.compare(password, this.password);
  }
};

module.exports = mongoose.model('User', UserSchema);
