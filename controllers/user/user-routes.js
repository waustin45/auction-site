const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Product, Bid } = require('../../models');

router.get('/', async (req, res) => {
  res.render('login', {})
})

//POST to url/user/createuser
router.post('/createuser', async (req, res) => {
  try {
    // const {id, user_name, email, address, real_name, password } = req.body
    
    const newUser = await User.create(
      {
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password
      }
    //   {
    //   user_name: req.body.user_name,
    //   email: req.body.email,
    //   address: req.body.address,
    //   real_name: req.body.real_name,
    //   password: req.body.password

    // }
    );
    console.log(newUser);
    
      req.session.user_id = newUser.user_name;
      req.session.table_id = newUser.id
      req.session.logged_in = true;
      console.log(req.session.user_id, req.session.table_id)
      res.json({ user: newUser.user_name, message: 'You are now logged in!' });
      
    
    // res.json(newUser);
  }catch(err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  // console.log(req.body.user_name)
  // res.json(req.body.user_name)
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });
    console.log(req.body.user_name)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

     //Verify the posted password with the password store in the database
     const validPassword = await bcrypt.compare(req.body.password, userData.password);
     console.log(userData.password)
  //  if(req.body.password == userData.password) {
    
  //     req.session.user_id = userData.user_name;
  //     req.session.table_id = userData.id
  //     req.session.logged_in = true;
      
  //     res.json({ user: userData, message: 'You are now logged in!' });
      
    
  //   }else if (!validPassword) {
  //     res
  //       .status(400)
  //       .json({ message: 'Incorrect email or password, please try again' });
  //     return;
  //   }

     //Create session variables based on the logged in user
     req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      
    });

  } catch (err) {
    res.status(700).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
