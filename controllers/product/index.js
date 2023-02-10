const router = require('express').Router();
const newProduct = require('./new-product-routes');
const productRoutes = require('./product-routes');

router.use('/', productRoutes);
// loaclahost3001/product/newproduct
router.use('/newproduct', newProduct);


module.exports = router;