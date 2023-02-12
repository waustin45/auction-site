const router = require('express').Router();
const { User, Product, Bid } = require('../models');
router.get('/', async (req, res) => {

    try {
     const data = await Product.findAll({
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
          {
            model: Bid,
            attributes: ['bid_amt'],
            order: ['bid_amt', 'ASC']
            
          }
        ],

      })
     const plainData = data.map((info) => info.get({ plain: true }));
     console.log(plainData);
     console.log(plainData[0].bids[0],plainData[0].bids[1],plainData[0].bids[5],plainData[0].bids[4]);
     
     res.render('homepage', { plainData, logged_in: req.session.logged_in, session_user: req.session.user_id  });
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
