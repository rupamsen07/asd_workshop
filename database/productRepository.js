const fs = require('fs/promises');
const path = require('path');

const dataFilePath = path.join(__dirname, 'products.json');

async function getAll() {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

async function saveAll(products) {
    await fs.writeFile(dataFilePath, `${JSON.stringify(products, null, 2)}\n`);
}

module.exports = { getAll, saveAll };