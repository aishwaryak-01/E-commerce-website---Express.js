const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {    
    res.render('admin/edit-product', {pageTitle: 'Add Product', path:'/admin/add-product', editing: false});
}

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode)
    {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
    if(!product)
    {
        res.redirect('/');
    }
    res.render('admin/edit-product', {pageTitle: 'Edit Product', path:'/admin/edit-product', editing: editMode, product: product});
    })
}

exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProducts = new Product(prodId, updatedTitle, updatedImage, updatedPrice, updatedDescription);
    updatedProducts.save(); 
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
    res.render('admin/products', {pageTitle:'Admin Products', path:'/admin/products', prods: products});
    });
}

exports.postDeleteProducts = (req, res, next) => {
    const prodId = req.body.productId; 
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}
