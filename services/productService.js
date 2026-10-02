const productRepository = require('../database/productRepository');

async function getProducts() {
    return productRepository.getAll();
}

async function getProductById(id) {
    const products = await productRepository.getAll();
    return products.find((product) => String(product.id) === id);
}

async function createProduct(productData) {
    const products = await productRepository.getAll();
    const id = products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    const product = { id, ...productData };
    await productRepository.saveAll([...products, product]);
    return product;
}

async function updateProduct(id, updates) {
    const products = await productRepository.getAll();
    const index = products.findIndex((product) => String(product.id) === id);
    if (index === -1) {
        return null;
    }

    const product = { ...products[index], ...updates };
    products[index] = product;
    await productRepository.saveAll(products);
    return product;
}

async function deleteProduct(id) {
    const products = await productRepository.getAll();
    const index = products.findIndex((product) => String(product.id) === id);
    if (index === -1) {
        return false;
    }

    products.splice(index, 1);
    await productRepository.saveAll(products);
    return true;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};