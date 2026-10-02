const express = require('express');
const productController = require('../controllers/productController');
const { cacheResponse, invalidateCache } = require('../middleware/cacheResponse');

const router = express.Router();

router.get('/', cacheResponse, productController.getProducts);
router.get('/:id', cacheResponse, productController.getProductById);
router.post('/', invalidateCache, productController.createProduct);
router.put('/:id', invalidateCache, productController.replaceProduct);
router.patch('/:id', invalidateCache, productController.updateProduct);
router.delete('/:id', invalidateCache, productController.deleteProduct);

module.exports = router;