const router = require('express').Router();
// change it back to const { Product } = require('../../models') once we create teh index.js in model folder
const { Product }= require('../../models');
const js = require("../../public/js/newproduct")

router.get('/', async (req, res) => {
    res.render('newproduct')
})
router.post('/', async (req, res) => {
    // const {product_name, category, expire_date, description, img, user_id} = req.body
    try {
        
       const prod = await Product.create({
            product_name: req.body.product_name,
            category: req.body.category,
            expire_date: req.body.expire_date,
            description: req.body.description,
            image: req.body.image,
            user_id: req.body.user_id

        })
        console.log(prod)
        res.status(200).json(prod)
    }catch (err) {
        res.status(500).json(err)
    }
})
// // localhost3001/product/newproduct
// model.get("/", )
// // localhost3001/product/newproduct/create
// model.get('/create')

module.exports = router;