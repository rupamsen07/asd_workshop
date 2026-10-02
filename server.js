const express = require('express');
const app = express();
const port = 3000;
const fs= require('fs/promises');
const path = require('path');
let filepath = path.join(__dirname, 'db.json');

let cashe = {
    '/products':[],
    '/products/1': {}
};

async function readData() {
    let data=await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);
}

app.get('/products', async (req, res) => {
    let cacheKey = req.url;
    let value=cashe[cacheKey];
    try{
        if (value){
            return res.json(value);
        }
    let products=await readData();
    cashe[cacheKey]=products;
    res.json(products);
    }catch(err){
        res.status(500).send('Error reading data');
    }
});
app.get('/products/:id', async (req, res) => {
    let products=await readData();
    let id=req.params.id;
    let product=products.find(p=>p.id==id);
    if(product){
        res.json(product);
    }else{
        res.status(404).send('Product not found');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});