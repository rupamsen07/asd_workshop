const productRepository = require('../database/productRepository');
const productCache = new Map();

async function getProducts() {
    if (!productCache.has('/products')) {
        productCache.set('/products', await productRepository.getAll());
    }
    return productCache.get('/products');
}

async function getProductById(id) {
    const cacheKey = `/products/${id}`;
    if (productCache.has(cacheKey)) {
        return productCache.get(cacheKey);
    }

    const products = await productRepository.getAll();
    const product = products.find((item) => String(item.id) === id);
    if (product) {
        productCache.set(cacheKey, product);
    }
    return product;
}

module.exports = { getProducts, getProductById };