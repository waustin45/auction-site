const router = require('express').Router();
const { User, Product, Bid } = require('../models');
router.get('/', async (req, res) => {

    try {
     const data = await Product.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Bid,
            attributes: ['bid_amt'],
            order: ['bid_amt', 'DESC']
            
          }
        ],

      })
     const plainData = data.map((info) => info.get({ plain: true }));
     console.log(plainData)
     
     res.render('homepage', { plainData });
    } catch (err) {
        res.status(500).json(err)
    }
    

});
router.get('/sort/asc', async (req, res) => {

    try {
     const data = await Product.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Bid,
          }
        ],
        order: [
            ['bids','ASC']
        ]
      })
     const plainData = data.map((info) => info.get({ plain: true }));
     console.log(plainData)
     res.json(plainData)
    //  res.render('homepage', { plainData });
    } catch (err) {
        res.status(500).json(err)
    }
    

});


module.exports = router;
