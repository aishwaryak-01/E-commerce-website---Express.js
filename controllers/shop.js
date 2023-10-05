const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
    res.render('shop/index', {pageTitle: 'Shop', path: '/', prods: products});
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
    res.render('shop/product-detail', {pageTitle: product.title, path: '/products', product: product});
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
    res.render('shop/product-list', {pageTitle: 'All Products', path:'/products', prods: products});
    })
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
    Product.fetchAll(products => {
    const CartProducts = [];
    for(let product of products)
    {
        const CartProductsData = cart.products.find(prod => prod.id === product.id);
        if(CartProductsData)
        {
            CartProducts.push({productData: product, qty: CartProductsData.qty})
        }
    }
    res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', products: CartProducts});
})
})
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProducts = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'});
}
