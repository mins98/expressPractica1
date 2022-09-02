const fs = require("fs");

exports.getAllProducts =(req,res)=> {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    console.log(req.requestTime);
    res.status(200).json({
        status:"success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data:{
            products
        }
    });
}
exports.addProduct=(req,res)=> {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/products.json`,JSON.stringify(products));
    res.status(200).json({
        status:"success",
        data:{
            products
        }
    });
}
exports.getProductById=(req,res)=> {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    const foundproduct=products.find(p=> p.id==req.params.id);
    if(foundproduct){
        res.status(200).json({
            status:"success",
            data:{
                product: foundproduct
            }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
}

exports.deleteProductById=(req,res)=> {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    const foundproduct=products.find(p=> p.id==req.params.id);
    if(foundproduct){
        const index=products.findIndex(p => p.id==req.params.id);
        products.splice(index,1);  
        fs.writeFileSync(`${__dirname}/../data/products.json`,JSON.stringify(products));
        res.status(200).json({
            status:"success",
            data:{
                idDeleted:req.params.id,
                product: products
            }
        });

    }
    else{
        res.status(404).json({
            status:"element not found to delete",
        });
    }
}

exports.updateProductById=(req,res)=> {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    const foundproduct=products.find(p=> p.id==req.params.id);
    if(foundproduct){
        const index=products.findIndex(p => p.id==req.params.id);
        products[index].name=req.body.name;
        products[index].price=req.body.price;
        products[index].category=req.body.category;

        fs.writeFileSync(`${__dirname}/../data/products.json`,JSON.stringify(products));
        res.status(200).json({
            status:"success",
            data:{
                idUpdated:req.params.id,
                productChanged: products[index]
            }
        });

    }
    else{
        res.status(404).json({
            status:"element not found to update",
        });
    }
}
