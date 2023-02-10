const router = require('express').Router();

const newProduct = require('./new-product-routes');
const productRoutes = require('./product-routes');


// loaclahost3001/product/newproduct
router.use('/newproduct', newProduct);
// router.use('/viewproduct', productRoutes);

module.exports = router;