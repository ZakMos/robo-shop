/**
 * EXTERNAL DEPS
 */
const express = require('express');
const router = express.Router();

/**
 * CONTROLLERS
 */
const cartController = require('../controllers/cart');

router.get('/', cartController.get);
router.get('/add/:id', cartController.add);
router.get('/remove/:id', cartController.remove);
router.get('/remove-all/:id', cartController.removeAll);

module.exports = router;
