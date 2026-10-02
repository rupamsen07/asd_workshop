const productService = require('../services/productService');

async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error reading data');
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Error reading data');
    }
}

module.exports = { getProducts, getProductById };