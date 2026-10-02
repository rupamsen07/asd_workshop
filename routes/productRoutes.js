const express = require('express');
const productController = require('../controllers/productController');
const cacheResponse = require('../middleware/cacheResponse');

const router = express.Router();

router.get('/', cacheResponse, productController.getProducts);
router.get('/:id', cacheResponse, productController.getProductById);

module.exports = router;