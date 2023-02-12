const router = require('express').Router();
const { User, Product, Bid } = require('../../models');

//GET all the info for one product
//url/product/view/:id
router.get('/view/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/user');
    } else {
        try {
            
            const dbProductData = await Product.findByPk(req.params.id, {
                include: [
                    {
                        model: Bid,
                        attributes: [
                            'bid_amt',
                        ],
                        order: ['bid_amt', 'DESC']

                    },
                    {
                        model: User,
                        attributes: [
                            'id',
                            'user_name',
                        ],
                    }
                ],
            });
            const product = dbProductData.get({ plain: true });
            console.log(product);
            res.render('product', { product, logged_in: req.session.logged_in, session_user: req.session.user_id })
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