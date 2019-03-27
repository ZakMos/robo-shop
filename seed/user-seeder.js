/* eslint no-console: 0 */
/**
 * EXTERNAL DEPS
 */
const mongoose = require('mongoose');

/**
 * CONFIG
 */
const {env, db} = require('../config/environment');

/**
 * MODELS
 */
const User = require('../models/user');


async function seed(){
  // Don;t run this function if it is not the devlopment environment
  if(env !== 'development') return;

  const testUser = {
    email: 'a@a.a',
    password: '1234567890'
  };

  // Create a db connection
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

  // Log db errors
  mongoose.connection.on('error', console.error);

  try {
    // First Try to delete an exisiting test user
    await User.deleteOne({ email: testUser.email });
    console.log('Test user deleted');
  } catch(e){ console.error(e); }

  try {
    // Create test user
    const user = new User(testUser);

    // Save new user
    await user.save();
    console.log('Test user created');

    // Disconnect from db
    mongoose.disconnect();
  } catch (e) { console.error(e); }
}

seed();
