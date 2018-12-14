var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
      message: 'Welcome to tigo gateway render server'
    })
});

module.exports = router;
