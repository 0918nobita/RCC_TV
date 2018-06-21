const express = require('express'),
      router = express.Router();

router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({
    'value': 'これはサンプルです'
  });
});

module.exports = router;
