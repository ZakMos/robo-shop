/**
 * EXTERNAL DEPS
 */
const express = require('express');
const router = express.Router();

/**
 * CONTROLLERS
 */
const shopController = require('../controllers/shop');

/* GET home page. */
router.get('/', shopController.get);

module.exports = router;
