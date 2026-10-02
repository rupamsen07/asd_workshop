const productRepository = require('../database/productRepository');

async function getProducts() {
    return productRepository.getAll();
}

async function getProductById(id) {
    const products = await productRepository.getAll();
    return products.find((product) => String(product.id) === id);
}

module.exports = { getProducts, getProductById };