const productService = require('../services/productService');

function isValidProductData(body, partial = false) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return false;
    }

    const keys = Object.keys(body);
    if (keys.some((key) => !['name', 'price'].includes(key))) {
        return false;
    }
    if (partial ? keys.length === 0 : !keys.includes('name') || !keys.includes('price')) {
        return false;
    }
    if ('name' in body && (typeof body.name !== 'string' || body.name.trim().length === 0)) {
        return false;
    }
    if ('price' in body && (typeof body.price !== 'number' || !Number.isFinite(body.price))) {
        return false;
    }
    return true;
}

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

async function createProduct(req, res) {
    if (!isValidProductData(req.body)) {
        return res.status(400).send('Product name and numeric price are required');
    }
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).send('Error writing data');
    }
}

async function replaceProduct(req, res) {
    if (!isValidProductData(req.body)) {
        return res.status(400).send('Product name and numeric price are required');
    }
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Error writing data');
    }
}

async function updateProduct(req, res) {
    if (!isValidProductData(req.body, true)) {
        return res.status(400).send('At least one valid product field is required');
    }
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Error writing data');
    }
}

async function deleteProduct(req, res) {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).send('Product not found');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).send('Error writing data');
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct,
};