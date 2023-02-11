const router = require('express').Router();
// change it back to const { Product } = require('../../models') once we create teh index.js in model folder
const { Product, User }= require('../../models');


router.get('/', async (req, res) => {
   const users = await User.findOne({ where: { user_name: req.session.user_id} })

    const userData = users.get({ plain: true });
    
    res.render('newproduct',{ session_user: req.session.user_id, id: userData.id, logged_in: req.session.logged_in })
})
router.post('/', async (req, res) => {
    // const {product_name, category, expire_date, description, img, user_id} = req.body
    // if (!req.session.logged_In) {
    //     res.redirect('/login');
    // } else {
    try {
        
       const prod = await Product.create({
            product_name: req.body.product_name,
            category: req.body.category,
            expire_date: req.body.expire_date,
            description: req.body.description,
            image: req.body.image,
            user_id: req.body.user_id

        })
        
        res.status(200).json(prod)
    }catch (err) {
        res.status(500).json(err)
    }
}
// }
)
// // localhost3001/product/newproduct
// model.get("/", )
// // localhost3001/product/newproduct/create
// model.get('/create')

module.exports = router;