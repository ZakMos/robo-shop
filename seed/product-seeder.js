/* eslint no-console: 0 */
/**
 * EXTERNAL DEPS
 */
const mongoose = require('mongoose');
const faker = require('faker');

/**
 * CONFIGS
 */
const { env, db } = require('../config/environment');

/**
 * MODELS
 */
const Product = require('../models/product');

async function seed() {
  // Don't do anything if it is not a development environment
  if (env !== 'development') return;

  /**
   * DB CONNECTION
   */
  mongoose.connect(
    db,
    {
      useNewUrlParser: true
    }
  );
  mongoose.connection.on('error', console.error);

  /**
   * GENERATE RANDOM PRODUCTS
   */
  try {
    // Delete Existing entries
    await Product.deleteMany({});
    console.log('Products Collection Purged!');
  } catch (e) {
    // Log errors
    console.error(e);
    return;
  }

  // Create an array of promises for each product being created
  // the array will have anything between 4 - 50 entries
  const productPromises = Array(faker.random.number({ min: 4, max: 50 }))
    // Fill the array with nulls, so we can map it
    .fill(null)
    .map(() => {
      // Randomize a product nae with faker
      const randomName = faker.commerce.productName();
      // Create a mongoose Product
      const product = new Product({
        // generate a url for robohash, for a quick image source
        imgUrl: `http://robohash.org/${randomName}`,
        title: randomName,
        // Create a description with a random length of words between 5 and 30
        description: faker.lorem.words(
          faker.random.number({ min: 5, max: 30 })
        ),
        // Generate a fake price
        price: faker.commerce.price()
      });

      // Map each null in the array into a saved random product
      return product.save();
    });

  try {
    // Resolve all product promises to save to db
    await Promise.all(productPromises);
    // Disconnect db
    mongoose.disconnect();
    console.log('Products Collection Seeded!');
  } catch (e) {
    // Log errors
    console.error(e);
  }
}

seed();
