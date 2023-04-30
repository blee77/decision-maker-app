const express = require('express');
const router  = express.Router();

router.get('/createpoll', (req, res) => {
  res.render('createpoll');
});

module.exports = router;
