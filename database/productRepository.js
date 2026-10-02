const fs = require('fs/promises');
const path = require('path');

const dataFilePath = path.join(__dirname, 'products.json');

async function getAll() {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = { getAll };