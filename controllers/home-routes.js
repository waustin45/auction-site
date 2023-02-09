const router = require('express').Router();

router.get('/', async (req, res) => {
    res.json('reading');

});



module.exports = router;
