const router = require('express').Router();
const sequelize = require('../config/connection');
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
            separate: true,
            order: [['bid_amt', 'DESC']],

            
          }
        ],
        
      })
     const plainData = data.map((info) => info.get({ plain: true }));
     console.log(plainData);
     res.render('homepage', { plainData, logged_in: req.session.logged_in, session_user: req.session.user_id  });
    } catch (err) {
        res.status(500).json(err)
    }
    

});
router.get('/sort/alphabetical/asc', async (req, res) => {

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
           
            separate: true,
            order: [['bid_amt', 'DESC']],
          }
        ],
       
         order: [
        [
          "product_name", "ASC"
        ]
      ],
      },
     
      )
     const plainData = data.map((info) => info.get({ plain: true }));
     console.log(plainData)
     res.render('homepage', { plainData, logged_in: req.session.logged_in, session_user: req.session.user_id  });
    //  res.render('homepage', { plainData });
    } catch (err) {
        res.status(500).json(err)
    }
    

});
router.get('/sort/alphabetical/dsc', async (req, res) => {

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
         
          separate: true,
          order: [['bid_amt', 'DESC']],
        }
      ],
     
       order: [
      [
        "product_name", "DESC"
      ]
    ],
    },
   
    )
   const plainData = data.map((info) => info.get({ plain: true }));
   console.log(plainData)
   res.render('homepage', { plainData, logged_in: req.session.logged_in, session_user: req.session.user_id  });
  //  res.render('homepage', { plainData });
  } catch (err) {
      res.status(500).json(err)
  }
  

});
router.get('/sort/bids/dsc', async (req, res) => {

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
         
          separate: true,
          order: [['bid_amt', 'DESC']],
        }
      ],
  
    //    order: [
    //   [
    //     "bids", "DESC"
    //   ]
    // ],
    },
   
    )
   const plainData = data.map((info) => info.get({ plain: true }));
   
   res.json(plainData)
  //  res.render('homepage', { plainData, logged_in: req.session.logged_in, session_user: req.session.user_id  });
  //  res.render('homepage', { plainData });
  } catch (err) {
      res.status(500).json(err)
  }
  

});


module.exports = router;
