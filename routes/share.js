const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('sharePoll');
});

module.exports = router;
