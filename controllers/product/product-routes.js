const router = require('express').Router();
const { User, Product, Bid } = require('../../models');

//GET all the info for one product
//url/product/view/:id
router.get('/view/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            
            const dbProductData = await Product.findByPk(req.params.id, {
                include: [
                    // {
                    //     model: User,
                    //     attributes: [
                    //         'id',
                    //         'user_name',
                    //     ],
                    //     model: Bid,
                    //     attributes: [
                    //         'user_id',
                    //         'bid_amt',
                    //     ]
                    // },
                ],
            });
            const product = dbProductData.get({ plain: true });
            res.render('product', { product, loggedIn: req.session.logged_In, session_user: req.session.user_id })
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err); 
        }
    }
}
);

// POST to place a bid
//url/product/view/:id
router.post('/view/:id', async (req, res) => {
    try {
        const newBid = await Bid.create({
            bid_amt: req.body.bid_amt,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
        });
        //Then what?  update page?
        res.json(newBid)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;