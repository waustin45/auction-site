const router = require('express').Router();

const userRoutes = require('./user');
const productRoutes = require('./product');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
// localhost3001/product
router.use('/product', productRoutes);

module.exports = router;
